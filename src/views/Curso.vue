
<template>
<Content title="" :action="action">
  <Interface
    noBtn
    :noTitle="true"
    :noFilter="true"
    :noHeader="true"
  >
  <div class="d-flex justify-content-center align-items-center px-5 rounded">
    <b-card-group deck>
    <b-card @click="goTo(1)" img-src="../assets/images/Group.png" img-alt="curso" img-top rounded>
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
        <b-card-title class="justify-content-center align-items-center text-dark font-weight-bold">
                Nome Bloco
            </b-card-title>
      </template>
    </b-card>

    <b-card @click="goTo(2)" img-src="../assets/images/Group.png" img-alt="conversation" img-top rounded>
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
        <b-card-title class="justify-content-center align-items-center text-dark font-weight-bold">
                Nome Bloco
            </b-card-title>
      </template>
    </b-card>

    <b-card  @click="goTo(3)" img-src="../assets/images/Group.png" img-alt="context" img-top>
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
        <b-card-title class="justify-content-center align-items-center text-dark font-weight-bold">
                Nome Bloco
            </b-card-title>
      </template>
    </b-card>
  </b-card-group>
</div>
</Interface>
</Content>
</template>

<script>
import Interface from '@/components/Dashboard/Interface'
import Content from '../components/content/index'

export default {
  components: {
    Interface, Content
  },
  computed: {
    action () {
      return { options: { label: 'Home', icon: 'home' } }
    }
  },
  methods: {
    goTo (id) {
      this.$router.push({ path: `/course/${id}` })
    }
  }
}
</script>

<style scoped>

.card{
  cursor: pointer !important;
  transition: 0.5s all ease-in-out;
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
}
</style>
