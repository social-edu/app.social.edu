<template>
  <Content :title="'Nome Bloco'" :action="action">
    <Interface
    noBtn
    :noTitle="true"
    :noFilter="true"
    :noHeader="true"
  >
  <div>
   <Table :items="items" :is-loading="loading"></Table>
  </div>
    </Interface>
  </Content>
</template>

<script>
import Interface from '@/components/Dashboard/Interface'
import Content from '../components/content/index'
import Table from '../components/Dashboard/Table'

export default {
  data: () => ({
    fields: [
      ''
    ],
    loading: false
  }),
  components: {
    Interface, Content, Table
  },
  computed: {
    action () {
      return { options: { label: 'Home', icon: 'home' } }
    },
    items () {
      return [{ phrases: 'Phrase 01' }, { phrases: 'Phrase 02' }, { phrases: 'Phrase 03' }, { phrases: 'Phrase 04' }, { phrases: 'Phrase 05' }, { phrases: 'Phrase 06' }, { phrases: 'Phrase 07' }, { phrases: 'Phrase 08' }]
    }
  }
}
</script>

<style>

</style>
