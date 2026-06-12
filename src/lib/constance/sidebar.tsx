import { ROLES, Sidebar } from "@/types";
import { BellRing, BookMarked, Building, CalendarOff, ChartNoAxesCombined, CreditCard, FingerprintPattern, GitFork, HomeIcon, Settings, UserRoundPlus, UsersRound } from "lucide-react";


export const SIDEBAR: Sidebar[] = [
    // Main Section
    {
        section: 'Main',
        items: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                icon: <HomeIcon />,
                role: [ROLES.SUPER_ADMIN, ROLES.COMPANY_ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE]
            },
            {
                title: 'Companies',
                path: '/companies',
                icon: <Building />,
                role: [ROLES.SUPER_ADMIN]
            },
            {
                title: 'Platform statistics',
                path: '/platform-statistics',
                icon: <ChartNoAxesCombined />,
                role: [ROLES.SUPER_ADMIN]
            },
            {
                title: 'Notifications',
                path: '/notifications',
                icon: <BellRing />,
                role: [ROLES.COMPANY_ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE]
            },

        ]
    },
    // Management Section * Super Admin Only *
    {
        section: 'Management',
        items: [
            {
                title: 'Subscriptions',
                path: '/subscriptions',
                icon: <CreditCard />,
                role: [ROLES.SUPER_ADMIN]
            },
            {
                title: 'Notifications',
                path: '/notifications',
                icon: <BellRing />,
                role: [ROLES.SUPER_ADMIN]
            },
            {
                title: 'Platform settings',
                path: '/platform-settings',
                icon: <Settings />,
                role: [ROLES.SUPER_ADMIN]
            },
        ]
    },
    // Employee Section * Company Admin *
    {
        section: 'Employee',
        items: [
            {
                title: 'Employee',
                path: '/employee',
                icon: <UsersRound />,
                role: [ROLES.COMPANY_ADMIN]
            },
            {
                title: 'Departments & Structure',
                path: '/departments-structure',
                icon: <GitFork className="rotate-180" />,
                role: [ROLES.COMPANY_ADMIN]
            },
            {
                title: 'Creating accounts',
                path: '/creating-accounts',
                icon: <UserRoundPlus />,
                role: [ROLES.COMPANY_ADMIN]
            },
        ]
    },
    {
        section: 'Operations',
        items: [
            {
                title: 'Attendance',
                path: '/attendance',
                icon: <FingerprintPattern />,
                role: [ROLES.COMPANY_ADMIN]
            },
            {
                title: 'Holidays',
                path: '/holidays',
                icon: <CalendarOff />,
                role: [ROLES.COMPANY_ADMIN]
            },
            {
                title: 'Performance evaluation',
                path: '/performance-evaluation',
                icon: <ChartNoAxesCombined />,
                role: [ROLES.COMPANY_ADMIN]
            },
        ]
    },
    {
        section: 'Management',
        items: [
            {
                title: 'Reports',
                path: '/reports',
                icon: <BookMarked />,
                role: [ROLES.COMPANY_ADMIN]
            },
            {
                title: 'settings company',
                path: '/settings-company',
                icon: <Settings />,
                role: [ROLES.COMPANY_ADMIN]
            },
        ]
    },
    // My team Section * Manager *
    {
        section: 'My team',
        items: [
            {
                title: "My department's employees",
                path: '/department-employees',
                icon: <UsersRound />,
                role: [ROLES.MANAGER]
            },
            {
                title: 'Organizational structure',
                path: '/organizational-structure',
                icon: <GitFork className="rotate-180" />,
                role: [ROLES.MANAGER]
            },
        ]
    },

    // Operations Section * Manager *
    {
        section: 'Operations',
        items: [
            {
                title: "Team attendance",
                path: '/team-attendance',
                icon: <FingerprintPattern />,
                role: [ROLES.MANAGER]
            },
            {
                title: 'Leave requests',
                path: '/leave-requests',
                icon: <CalendarOff />,
                role: [ROLES.MANAGER]
            },
            {
                title: 'Performance evaluation',
                path: '/performance-evaluation',
                icon: <ChartNoAxesCombined />,
                role: [ROLES.MANAGER]
            },
        ]
    },
];