import { Icons } from "@/components/icons"

interface NavItem {
    title: string
    to?: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export const mainMenu: NavItemWithChildren[] = [
    {
        title: 'Dashboard',
        to: '',
    },
    {
        title: 'Dropdown',
        items: [
            {
                title: 'Sample',
                to: '/sample',
            },
            {
                title: 'Sample Dua',
                to: '/#',
            },
        ]
    },
    {
        title: 'Empty',
        to: 'empty',
    },
    {
        title: 'Login',
        to: '/login',
    },
    {
        title: 'Client Registration',
        to: '/client-registration',
    },
    {
        title: 'Seller Registration',
        to: '/seller-registration',
    },
    {
        title: 'Register Landing',
        to: '/registration',
    },
    {
        title: 'Landing Page',
        to: '/landing',
    },
    {
        title: 'Customer Info',
        to: '/customer-info',
    },
    {
        title:'E-commerce',
        to:'/shop',
    },
    {
        title: 'CustomerDashboard',
        to: '/customer-dashboard',
    },
]

export const sideMenu: NavItemWithChildren[] = []
