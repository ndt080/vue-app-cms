<template>
  <div class="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Установить данное web-приложение на устройство</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
                  data-dismiss="modal"
                  @click.prevent="dismiss()"
          >Cancel</button>
          <button type="button" class="btn btn-primary"
                  @click.prevent="installApp()"
          >Install</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Modal_install",
  data() {
    return {
      deferredPrompt: null
    };
  },
  created() {
    window.addEventListener("BeforeInstallPrompt", e => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appInstalled", () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async dismiss() {
      this.deferredPrompt = null;
    },
    async installApp() {
      this.deferredPrompt.prompt();
    }
  }
}
</script>

<style scoped>

</style>
