import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FaBell,
  FaCheckCircle,
  FaChartLine,
  FaFilter,
  FaTasks,
  FaUserPlus,
} from "react-icons/fa";

const STORAGE_KEYS = {
  PANELS: "panel_access.panels",
  ASSIGNMENTS: "panel_access.assignments",
};

const moduleLibrary = [
  {
    id: "insights",
    label: "Lead Insights",
    description: "Top KPI cards for new leads, calls, and re-engagements.",
    icon: FaUserPlus,
  },
  {
    id: "leadFunnel",
    label: "Lead Funnel",
    description: "Visual funnel showing leads to conversion journey.",
    icon: FaFilter,
  },
  {
    id: "approvals",
    label: "Approvals",
    description: "Approvals widget with sent/received breakdown.",
    icon: FaCheckCircle,
  },
  {
    id: "tasks",
    label: "Task Shortcuts",
    description: "Quick actions for today's tasks and follow-ups.",
    icon: FaTasks,
  },
  {
    id: "performance",
    label: "Performance",
    description: "Today's performance cards with averages and KPIs.",
    icon: FaChartLine,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts, reminders, and unread communication feed.",
    icon: FaBell,
  },
];

const defaultPanels = [
  {
    id: "executive-suite",
    name: "Executive Suite",
    description: "Complete 360° visibility for admins and managers.",
    accent: "#2563eb",
    modules: moduleLibrary.map((module) => module.id),
  },
  {
    id: "velocity-pod",
    name: "Velocity Pod",
    description: "Focused on leads, funnel, and quick actions.",
    accent: "#f97316",
    modules: ["insights", "leadFunnel", "tasks"],
  },
];

const defaultAssignments = {
  "1": { panelId: "executive-suite", overrides: {} },
  "2": { panelId: "velocity-pod", overrides: { approvals: true } },
  "3": { panelId: "executive-suite", overrides: { notifications: false } },
};

const PanelAccessContext = createContext(null);

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Failed to parse ${key}:`, error);
    return fallback;
  }
};

export const PanelAccessProvider = ({ children }) => {
  const [panels, setPanels] = useState(() =>
    readStorage(STORAGE_KEYS.PANELS, defaultPanels)
  );
  const [assignments, setAssignments] = useState(() =>
    readStorage(STORAGE_KEYS.ASSIGNMENTS, defaultAssignments)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.PANELS, JSON.stringify(panels));
  }, [panels]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEYS.ASSIGNMENTS,
      JSON.stringify(assignments)
    );
  }, [assignments]);

  const availableModules = useMemo(() => moduleLibrary, []);

  const createPanel = useCallback((panelInput) => {
    setPanels((prev) => [
      ...prev,
      {
        id: `panel_${Date.now()}`,
        name: panelInput.name?.trim() || "Untitled Panel",
        description: panelInput.description?.trim() || "",
        accent: panelInput.accent || "#2563eb",
        modules:
          panelInput.modules?.length > 0
            ? panelInput.modules
            : moduleLibrary.map((module) => module.id),
      },
    ]);
  }, []);

  const assignPanelToUser = useCallback((userId, panelId) => {
    setAssignments((prev) => ({
      ...prev,
      [String(userId)]: {
        panelId,
        overrides: prev[String(userId)]?.overrides || {},
      },
    }));
  }, []);

  const toggleUserModule = useCallback(
    (userId, moduleId) => {
      setAssignments((prev) => {
        const current = prev[String(userId)] || {
          panelId: panels[0]?.id,
          overrides: {},
        };
        const overrides = { ...(current.overrides || {}) };
        overrides[moduleId] = !overrides[moduleId];
        return {
          ...prev,
          [String(userId)]: {
            panelId: current.panelId || panels[0]?.id,
            overrides,
          },
        };
      });
    },
    [panels]
  );

  const getUserPanelConfig = useCallback(
    (userId) => {
      const assignment = assignments[String(userId)];
      const panel =
        panels.find((item) => item.id === assignment?.panelId) || panels[0];
      const modules = new Set(panel?.modules || []);

      const overrides = assignment?.overrides || {};
      Object.entries(overrides).forEach(([moduleId, allowed]) => {
        if (allowed) {
          modules.add(moduleId);
        } else {
          modules.delete(moduleId);
        }
      });

      return {
        panel,
        modules: Array.from(modules),
      };
    },
    [assignments, panels]
  );

  const value = {
    panels,
    assignments,
    availableModules,
    createPanel,
    assignPanelToUser,
    toggleUserModule,
    getUserPanelConfig,
  };

  return (
    <PanelAccessContext.Provider value={value}>
      {children}
    </PanelAccessContext.Provider>
  );
};

// This custom hook is consumed across the app; suppress the fast-refresh warning
// because this file intentionally shares both the provider and hook.
// eslint-disable-next-line react-refresh/only-export-components
export const usePanelAccess = () => {
  const context = useContext(PanelAccessContext);
  if (!context) {
    throw new Error("usePanelAccess must be used within PanelAccessProvider");
  }
  return context;
};


