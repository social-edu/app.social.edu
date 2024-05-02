<template>
    <Content :title="'Monologue'" :action="action">
    <Interface
    noBtn
    :noTitle="true"
    :noFilter="true"
    :noHeader="true"
  >
  <div class="container">
    <!-- Coluna 1 -->
    <div class="column">
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 1.</p>
      <br>
    </div>

    <!-- Linha Vertical -->
    <div class="vertical-line text-dark"></div>

    <!-- Coluna 2 -->
    <div class="column">
      <p class="text-dark">Conteúdo da coluna 2.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 2.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 2.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 2.</p>
      <br><p class="text-dark">Conteúdo da coluna 2.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 2.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 2.</p>
      <br>
      <p class="text-dark">Conteúdo da coluna 2.</p>
       <!-- Botão Play com Ícone Material Icons -->
       <button class="play-button">
        <i class="material-icons">play_arrow</i>
      </button>
    </div>
  </div>
   <!-- Botão Próximo -->
   <button class="next-button">Próximo</button>
</Interface></Content>
</template>

<script>
import Interface from '@/components/Dashboard/Interface'
import Content from '../components/content/index'
export default {
  data () {
    return {
      // columnWidth: '50%' // Defina a largura inicial das colunas
    }
  },
  components: {
    Interface, Content
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
<style scoped>
.container {
  display: flex;
  align-items: stretch;
}

.column {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}

.vertical-line {
  border-left: 3px solid #000;
  height: auto;
  margin: 0 10px;
}

.play-button {
  position: absolute;
  border-radius: 100%;
  bottom: 10px;
  right: 10px;
  background-color: #115f63; /* Verde Escuro */
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.play-button i {
  font-size: 24px;
}

.next-button {
  position: fixed;
  bottom: 25px;
  right: 10px;
  border-radius: 15px;
  background-color: #115f63; /* Mesma cor do botão de play */
  color: #fff;
  padding: 10px;
  margin: auto;
  border: none;
  cursor: pointer;
}
</style>
