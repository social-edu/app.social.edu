import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Recover Password
import RecoverPassword from '@/views/RecoverPassword.vue'

// Recover Confirm
import RecoverConfirm from '@/views/RecoverConfirm.vue'

// New Password
import NewPassword from '@/views/NewPassword.vue'

// Password Reseted
import PasswordReseted from '@/views/PasswordReseted.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/conversation',
        name: 'Conversation',
        component: () => import('@/views/Conversation.vue'),
        meta: { hasViewedModal: false }
      },
      /*       {
        path: '/conversation/:key',
        name: 'conversation',
        component: () => import('@/views/Conversation.vue'),
        props: (route) => ({ key: route.params.key })
      }, */
      {
        path: '/course',
        name: 'Curso',
        component: () => import('@/views/Curso.vue')
      },
      {
        path: '/course/:id',
        name: 'Bloco',
        component: () => import('@/views/Bloco.vue')
      },
      {
        path: '/monologue/:id',
        name: 'Monologue',
        component: () => import('@/views/Monologue.vue')
      },
      {
        path: '/context',
        name: 'Context',
        component: () => import('@/views/Context.vue')
      },
      {
        path: '/alunos',
        name: 'Alunos',
        component: () => import('@/views/Alunos.vue')
      }
      /* {
        path: 'modulos',
        name: 'Modulos',
        component: () => import('@/views/Modulos.vue')
      },
      {
        path: 'dicionarios',
        name: 'Dicionarios',
        component: () => import('@/views/Dicionarios.vue')
      },
      {
        path: 'rotas',
        name: 'Rotas',
        component: () => import('@/views/Rotas.vue')
      },
      {
        path: 'configurar',
        name: 'Configurar',
        component: () => import('@/views/ConfigurarRotas.vue')
      },
      {
        path: 'configurar_sistemas',
        name: 'ConfigurarSistemas',
        component: () => import('@/views/ConfigurarSistemas.vue')
      },
      {
        path: 'clientes',
        name: 'Clientes',
        component: () => import('@/views/Clientes.vue')
      },
      {
        path: 'empresas',
        name: 'Empresas',
        component: () => import('@/views/Empresas.vue')
      },
      {
        path: 'cadastrar_:module',
        name: 'Cadastro',
        component: () => import('@/views/Form.vue'),
        props: (route) => ({ module: route.params.module })
      },
      {
        path: 'novo_modulo',
        name: 'CadastrarModulos',
        component: () => import('@/views/CadastrarModulos.vue')
      },
      {
        path: 'nova_rota',
        name: 'NovaRota',
        component: () => import('@/views/CadastrarRotas.vue')
      },
      {
        path: 'integracoes',
        name: 'Integracoes',
        component: () => import('@/views/Integracoes.vue')
      } */
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  // Recover Password
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: RecoverPassword,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogged) {
        next({ path: '/' })
        return
      }
      next()
    }
  },

  // Recover Confirm
  {
    path: '/recover-confirm',
    name: 'RecoverConfirm',
    component: RecoverConfirm,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogged) {
        next({ path: '/' })
        return
      }
      next()
    },
    props: (route) => ({ cpf: route.params.cpf })
  },

  // Reset Password
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword
  },

  // Password Reseted
  {
    path: '/password-reseted',
    name: 'PasswordReseted',
    component: PasswordReseted
  },

  { path: '*', redirect: '/' } // Not Found

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (['Login'].includes(to.name) && store.getters.isLogged) {
    next({ name: 'Dashboard' })
    return
  }
  if (!['Login', 'RecoverPassword', 'RecoverConfirm'].includes(to.name) && !store.getters.isLogged) {
    next({ name: 'Login' })
    return
  }
  next()
})

export default router
