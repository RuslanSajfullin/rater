import Authorization from '@/components/Authorization'
import Registration from '@/components/Registration'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import Hello from '@/components/Hello'
import Game from '@/components/Game'

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: Authorization
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/posts/:id/edit',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
  ]

export default routes
