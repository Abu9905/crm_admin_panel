import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { FaTimes } from "react-icons/fa";

const SidebarAdmin = ({ onClose }) => {
  const location = useLocation();
  const isUserPanel = location.pathname.startsWith("/layout/user-panel");
  const leadManagementStructure = {
    Data: ["New Data", "Junk", "Opportunity (Hot, warm, Cold)", "Custom"],
    Leads: [
      "New",
      "In conversation",
      "Attempt (1,2,3,4,5)",
      "On hold",
      "Junk",
      "Re engage leads",
      "Not interested",
      "Converted",
      "Custom",
    ],
    "Pipeline Analysis": ["Attempt 2", "Attempt 3", "Attempt 4", "Attempt 1"],
    "Custom Stage": ["Clients own"],
  };
  const ConversationManagementStructure = {
    Email : ["1. All", "2. Sent", "3. Delivered", "4. Read","5. Replied","6. Failed"],
    SMS : ["1. All", "2. Sent", "3. Delivered", "4. Read","5. Replied","6. Failed"],
    WhatsApp : ["1. All", "2. Sent", "3. Delivered", "4. Read","5. Replied","6. Failed"],
    Forms : ["1. All", "2. Sent", "3. Delivered", "4. Read","5. Replied","6. Failed"],
    Calls : ["1. All", "2. Sent", "3. Delivered", "4. Read","5. Replied","6. Failed"],
  };
  const reportsManagementStructure = {
    "Leads": ["Lead Over View","Funnel Analysis","Qualified & Unqualified", "Touched & Untouched","Lead Count","Active & Open","Lost Lead","Lead Analysis","Lead Conversion"],
    "Sales": ["Sales Overview","Follow up","Meeting","Review","Registration","Enrolled","Open & Closed Task"],
    "Marketing ": ["Campaign wise ","Source Wise","Product Wise","ROI","Location Analysis","Re-engaged "],
    "Calls": ["Incoming & Outgoing","Answered & Unanswered","First Response Time","Last Calls","Date Wise Call","Talktime Report"],
  };
  const taskManagementStructure = {
    "All": [],
    "Create": [],
    "Open": [],
    "Pending": [],
    "Closed": [],
    "Missed": [],
  };
  const marketingManagementStructure = {
    "All": [],
    "Open": [],
    "Pending": [],
    "Closed": [],
    "Missed": [],
  };
  const conversionManagementStructure = {
    "Leaderboard": [],
    "Sales": [],
    "Sales Post": [],
  };

  const videoManagementStructure = {
    "CRM_Video": ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5"],
  };

  const allNavItems = [
    {
      title: "Dashboard",
      icon: "/Buttons.png",
      sub: ["System Default", "Custom"],
      link: "/layout/dashboard",
    },
    {
      title: "Lead Management",
      icon: "/Buttons1.png",
      sub: leadManagementStructure,
      link: "/layout/lead-management",
      isNested: true,
    },
    {
      title: "Conversation",
      icon: "/Buttons2.png",
      sub: ConversationManagementStructure,
      link: "/layout/conversation",
      isNested: true,
    },
    {
      title: "Task",
      icon: "/Buttons3.png",
      sub: taskManagementStructure,
      link: "/layout/task",
      isNested: true,
    },
    {
      title: "Reports",
      icon: "/Buttons5.png",
      sub: reportsManagementStructure,
      link: "/layout/reports",
      isNested: true,
    },
    {
      title: "Marketing",
      icon: "/Buttons6.png",
      sub: marketingManagementStructure,
      link: "/layout/marketing",
      isNested: true,
    },
    {
      title: "Conversion",
      icon: "/Buttons4.png",
      sub: conversionManagementStructure,
      link: "/layout/conversion",
      isNested: true,
    },
    {
      title: "Video",
      icon: "/Buttons8.png",
      sub: videoManagementStructure,
      link: "/layout/video",
      isNested: true,
    },
    {
      title: "Settings",
      icon: "/Buttons9.png",
      sub: ["Setting", "Admin Panel", "Open", "Pending", "Closed", "Missed"],
      link: "/layout",
    },
  ];

  // Filter nav items based on user panel - show only 7 icons for user panel
  const navItems = isUserPanel
    ? allNavItems
        .filter(
          (item) =>
            item.title !== "Marketing" && item.title !== "Settings"
        )
        .map((item) => {
          // Update Dashboard link for user panel
          if (item.title === "Dashboard") {
            return {
              ...item,
              link: "/layout/user-panel",
            };
          }
          return item;
        })
    : allNavItems;

  const [openIndex, setOpenIndex] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const sidebarRef = useRef(null);
  const menuRefs = useRef({});

  // Close menu when clicking anywhere on the screen (sidebar, main content, anywhere)
  useEffect(() => {
    const handleClickAnywhere = (event) => {
      if (openIndex === null) return;

      // Check if click is inside the open menu
      const menuRef = menuRefs.current[openIndex];
      const clickedInsideMenu = menuRef && menuRef.contains(event.target);

      // Close menu if clicked anywhere outside the menu
      // (Button clicks use stopPropagation so they won't trigger this)
      if (!clickedInsideMenu) {
        setOpenIndex(null);
        setOpenCategory(null);
      }
    };

    if (openIndex !== null) {
      // Use a small delay to ensure button onClick executes first
      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickAnywhere);
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleClickAnywhere);
      };
    }
  }, [openIndex]);

  return (
    <div
      ref={sidebarRef}
      className="w-[70px] sm:w-[80px] lg:max-w-[10vw] h-full border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 flex flex-col px-2 py-4 sm:py-6 space-y-4 sm:space-y-6 relative z-50"
      style={{ overflow: 'visible' }}
    >
      {/* Mobile close button */}
      {onClose && (
        <div className="flex justify-end mb-2 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <FaTimes className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      )}
      {navItems.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center relative group">
          {/* Main Nav Item */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(openIndex === idx ? null : idx);
            }}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-center items-center relative cursor-pointer"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="h-[28px] sm:h-[32px] lg:h-[35px] w-auto object-cover dark:brightness-0 dark:invert"
            />

            {/* Hover Text Tooltip */}
            <span className="absolute left-[110%] bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none z-50">
              {item.title}
            </span>
          </button>

          {/* Sub Nav Flyout (Right Side) */}
          {openIndex === idx && (
            <div
              ref={(el) => (menuRefs.current[idx] = el)}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900 rounded-lg border dark:border-gray-700 p-3 flex flex-col z-[10000] min-w-[200px] sm:min-w-[220px] max-w-[90vw] max-h-[80vh] overflow-y-auto"
            >
              {item.isNested ? (
                // Nested structure for Lead Management
                <>
                  <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2 px-2 py-1 border-b dark:border-gray-700">
                    {item.title}
                  </div>
                  {Object.entries(item.sub).map(([category, subItems]) => (
                    <div key={category} className="relative">
                      <button
                        onClick={() =>
                          setOpenCategory(
                            openCategory === category ? null : category
                          )
                        }
                        className="w-full text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap px-2 py-1.5 rounded-md flex items-center justify-between cursor-pointer"
                      >
                        <span>{category}</span>
                        <ChevronRight
                          size={14}
                          className={`transition-transform ${
                            openCategory === category ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {openCategory === category && (
                        <div className="ml-2 mt-1 border-l-2 border-gray-200 dark:border-gray-600 pl-2 space-y-0.5">
                          {subItems.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              onClick={() => {
                                setOpenIndex(null);
                                setOpenCategory(null);
                              }}
                              to={`${item.link}/${subItem
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[(),]/g, "")}`}
                              state={{ section: category.toLowerCase() }}
                              className="block text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                // Simple flat structure for other items
                item.sub.map((subItem, subIdx) => {
                  // Special handling for Admin Panel
                  const linkPath =
                    subItem === "Admin Panel"
                      ? "/layout/admin-panel"
                      : `${item.link}/${subItem
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;

                  return (
                    <Link
                      key={subIdx}
                      onClick={() => setOpenIndex(null)}
                      to={linkPath}
                      className="text-xs text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {subItem}
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarAdmin;
