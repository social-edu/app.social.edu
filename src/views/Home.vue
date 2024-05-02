<template>
  <Content :title="'Bem-vindo(a) ' + $store.state.user.name">
  <Interface
    noBtn
    :noTitle="true"
    :noFilter="true"
    :noHeader="true"
  >
  <div v-if="$store.state.user.name !== 'Super Admin'" class="d-flex justify-content-center align-items-center">
    <b-card-group deck>
   <!-- <b-card @click="goTo('Curso')" img-src="../assets/images/curso.png" img-alt="curso" img-top>
      <b-card-title>
        <img src="../assets/images/Group 149.png" alt=""> Curso
      </b-card-title>
      <template #footer>
        <b-row>
          <b-col>
            <b-row class="card-actions">
              <b-img style="width: 20%;" src="../assets/custom-icons/image0.svg" alt=""></b-img>
              <small class="text-muted text-sm-left">35 Classes</small>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="card-actions">
              <b-img style="width: 20%;" src="../assets/custom-icons/user 1.svg" alt=""></b-img>
              <small class="text-muted text-sm-left">291 Students</small>
            </b-row>
          </b-col>
          <b-col>
           <b-row class="card-actions">
            <b-img style="width: 40%;" src="../assets/custom-icons/star 1.svg" alt=""></b-img>
            <small class="text-muted text-sm-left">4.7</small>
           </b-row>
          </b-col>
        </b-row>
      </template>
    </b-card> -->

    <b-card  @click="goTo('Conversation')" img-src="../assets/images/conversation.png" img-alt="conversation" img-top rounded>
      <b-card-title>
        <img src="../assets/images/Group 149.png" alt=""> Conversation
      </b-card-title>
      <!-- <template #footer>
        <b-row>
          <b-col>
            <b-row class="card-actions">
              <b-img style="width: 20%;" src="../assets/custom-icons/image0.svg" alt=""></b-img>
              <small class="text-muted text-sm-left">35 Classes</small>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="card-actions">
              <b-img style="width: 20%;" src="../assets/custom-icons/user 1.svg" alt=""></b-img>
              <small class="text-muted text-sm-left">291 Students</small>
            </b-row>
          </b-col>
          <b-col>
           <b-row class="card-actions">
            <b-img style="width: 40%;" src="../assets/custom-icons/star 1.svg" alt=""></b-img>
            <small class="text-muted text-sm-left">4.7</small>
           </b-row>
          </b-col>
        </b-row>
      </template> -->
    </b-card>

    <!--<b-card  @click="goTo('Context')" img-src="../assets/images/context.png" img-alt="context" img-top>
      <b-card-title>
       <img src="../assets/images/Group 149.png" alt=""> Context
      </b-card-title>
      <template #footer>
        <b-row>
          <b-col>
            <b-row class="card-actions">
              <b-img style="width: 20%;" src="../assets/custom-icons/image0.svg" alt=""></b-img>
              <small class="text-muted text-sm-left">35 Classes</small>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="card-actions">
              <b-img style="width: 20%;" src="../assets/custom-icons/user 1.svg" alt=""></b-img>
              <small class="text-muted text-sm-left">291 Students</small>
            </b-row>
          </b-col>
          <b-col>
           <b-row class="card-actions">
            <b-img style="width: 40%;" src="../assets/custom-icons/star 1.svg" alt=""></b-img>
            <small class="text-muted text-sm-left">4.7</small>
           </b-row>
          </b-col>
        </b-row>
      </template>
    </b-card> -->
  </b-card-group>
</div>
  </Interface>
</Content>
</template>

<script>
import Interface from '@/components/Dashboard/Interface'
import Content from '../components/content/index'
import { toast } from '@/utils'

export default {
  components: {
    Interface, Content
  },
  data: () => ({
    /*  sortBy: undefined,
    sortDirection: true,
    edit: null,
    isFiltering: false,
    filterData: {},
    fields: [
      { key: 'key', label: 'Nome' },
      { key: 'description', label: 'Descrição' },
      { key: 'auth_type', label: 'Autenticação' },
      { key: 'base_url', label: 'URL' },
      { key: 'GoToRotas', label: 'Rotas' },
      { key: 'GoToModulosHome', label: 'Módulos' },
      { key: 'Editar', label: 'Editar' },
      { key: 'Excluir', label: 'Excluir' },
      { key: 'Refresh', label: 'Testar' },
      { key: 'Settings', label: 'Configurar' }
    ]
 */
  }),
  /*  watch: {
    filterData: {
      handler (value) {
        Object.keys(value).forEach((key) => {
          if (value[key] === '') {
            // console.log("empty: " + value);
            delete value[key]
          }
        })
      },
      deep: true
    }
  }, */
  computed: {
    action () {
      return { options: { label: 'Novo', icon: 'add' } }
    }
  },
  created () {
  },
  methods: {

    /*  filterSwitch (value) {
      this.isFiltering = value
      if (!value) this.filterData = {}
    }, */
    goTo (route) {
      const routes = ['Curso', 'Context']
      if (!routes.includes(route)) {
        this.$router.push({ name: route })
      } else { toast(this, 'info', 'Atenção', 'Em desenvolvimento') }
    }
    /* sort (e, z) {
      this.sortBy = e
      this.sortDirection = z
    } */
  }
}
</script>
<style scoped>

.card{
  cursor: pointer !important;
  transition: 0.5s all ease-in-out;
  padding: 0.7em;
}

.card:hover{
  transform: scale(1.1);
}

.card-img, .card-img-top{
  height: 300px;
  max-width: max-content
}

.card-actions {
    gap: 2%;
    margin: auto;
    justify-content: center;
    width: max-content;
    align-content: center;
}

@media screen and (max-width: 920px) {
  .card-title{
    flex-direction: column;
    display: flex;
    align-items: center;
    width: max-content;
  }
  .card-actions{
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
  }
  .card-body{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
