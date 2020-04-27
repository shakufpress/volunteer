
const routes = [
  { path: '/', component: () => import('pages/login.vue') },
  { path: '/admin', component: () => import('pages/loginAdmin.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/admin_volunteers_dashboard', component: () => import('pages/AdminVolunteersDashboard.vue') },
      { path: '/admin_tasks_dashboard', component: () => import('pages/AdminTasksDashboard.vue') },
      { path: '/volunteer_tasks_dashboard', component: () => import('pages/VolunteerTasksDashboard.vue') },
      { path: '/about', component: () => import('pages/About.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
