<template>
    <div>

      <b-modal id="bv-modal-mic" v-model="showModal" title="Configurar Microfone" hide-footer>
        <div>
          <p v-if="hasDefaultMicrophone">
          Você já possui um microfone predefinido.
        </p>
        <p v-else>
          Parece que você ainda não configurou um microfone predefinido.
        </p>
          <p>
            Se deseja mudar para outro dispositivo, por favor, acesse as configurações do seu navegador.
          </p>
          <p>
            <b>Google Chrome:</b> <code>Clique nos três pontos no canto superior direito -> Configurações -> Privacidade e Segurança -> Configurações do Site -> Microfone.</code>
          </p>
          <p>
            <b>Firefox:</b> <code>Clique no menu no canto superior direito -> Preferências -> Privacidade e Segurança -> Configurações de Permissões -> Microfone.</code>
          </p>
          <!-- Adicione mais instruções para outros navegadores, se necessário -->
          <b-button variant="info" class="mt-3" block @click="$bvModal.hide('bv-modal-mic')">Ok</b-button>
        </div>
      </b-modal>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      showModal: false,
      hasDefaultMicrophone: false
    }
  },
  mounted () {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const audioDevices = devices.filter(device => device.kind === 'audioinput')
        this.hasDefaultMicrophone = audioDevices.length > 0
        if (!this.hasDefaultMicrophone) {
          this.showModal = true
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar dispositivos:', error)
      })
    if (this.$route.meta.hasViewedModal === false) {
      this.showModal = true
      this.$route.meta.hasViewedModal = true
    }
  }
}
</script>
<style scoped>
code {
  color:#126470
}
</style>
