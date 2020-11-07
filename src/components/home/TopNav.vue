<template>
  <header class="topNav" >
    <div class="text-left" style="display: inline-flex">
      <img alt="logo"
           width="35rem"
           src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA0NzMgNTY2LjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3MyA1NjYuOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzBBMzQ3MDt9DQo8L3N0eWxlPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTI4MC42LDU2NS44Yy03OS40LDEuNC0xNDIuMiw5LjYtMTgwLjktNTQuM2MtMTYuOS0zMi45LTEyLjgtNjguNC00MC42LTU3LjNjOS40LTEwLjEsMTcuNS0xMy4xLDI2LjUtNy4yDQoJYy0xNC44LTM0LjItMjYtODYuNywxMy4xLTEyOC44Yy0xNy4yLDQ5LjYsNC4zLDM3LjIsMTYuNSw4OC43YzAuMi00My44LTQyLjQtNTguMywyMS41LTE0NC4yYy0yNS4yLDQxLDQuMyw0MS40LTUuOCwxMDQuNg0KCWMyMC4zLTU0LjMtMjUuNy05Ni41LDQ4LjEtMTUzLjFjLTEzLjksMjYuMy03LjYsNzAuNC0xNy41LDEwMi40YzI1LjYtNjIuOS05LjQtODkuNiw3MS40LTE1MC4zYy0yNy40LDM3LjQtNS4zLDUwLjgtMzAuMiw5My40DQoJYzQzLTUxLjQsMC4yLTkwLjQsNzkuNy0xMzRjLTM3LjIsNDEuMy0xMC45LDU1LjktMzMuNiw4OC4yYzM3LjMtMzItNy42LTc5LjEsOTAuNi0xMzEuOWMtMzIuNCwyOS44LTIyLDQ3LjEtMzguOCw3NS43DQoJYzI4LTQ5LDY3LjYtNzIuMSw0NS41LTEwMy4yYzEyLjUsOC4zLDI0LjMsMzEuNCwxMC40LDUxYzI2LjEtOS40LDcwLjgtOTYuMywyNi4zLTk4LjljMC43LDAsNy44LDEuOCw5LjIsNmMxLjQsNC4zLDEuNCw4LjUsMS4xLDkNCgljLTEuNywzLTQuMiw1LjctNy4yLDYuNGMtMTIuMiwyLjYtMTYuNS03LjktMTIuNC0xNi44YzEuNC0zLjEsNC40LTYsNy42LTcuOGMyLjEtMS4yLDQuMi0xLjcsNi4xLTEuN0M0MDMuOCwxLjcsNDExLjIsMTguNSw0MTEsMzgNCgljLTAuMywzMS40LTI1LjcsNzcuNy02Ni4xLDEwMi4xYzMzLjItMTUuNSw0OS43LTM2LjEsNjAuNi01OS44Yy03LjEsODMuOC05OS41LDc4LjQtMTM2LjgsMTM2YzM2LTQzLjYsMTIwLjctNTUuNCwxMjUuMS05NS4yDQoJYzMuMyw0OC45LTUwLjIsODMuNS04OC43LDk1LjJjLTM3LjksMTMuMS02OS4xLDI4LjgtOTYsNTguN2wtMTIuNCwxMy43YzMzLjItMjguMSw1Ni4xLTQ4LjcsMTAwLjYtNTkuM2MzMS4zLTcuNSw1MS0xMy43LDY2LjYtNDEuNg0KCWMtMi4zLDEyLjUtMi44LDI0LjQtOS41LDM1LjRjLTQxLjYsNjguMi0xNTIsNDAuNC0yMDIuMSwxNDIuNWMxNi40LTE5LjksMjcuMy0zNiw0OC41LTUwLjljMzUuNy0yNC45LDg4LjQtMjUuNiwxMjEuNS01MC40DQoJYy0xNi4xLDQ1LjctNjMsNzAuNy0xMDcuNiw4NC43Yy0zOC42LDEzLjMtNTguNSwxNC4xLTcwLjQsNjRjMjUuMy03MS41LDc3LTMxLjcsMTE1LjItNzUuM2MtMzMuOSw4OS44LTExMC4yLDMxLjQtMTEwLjYsMTMyLjkNCgljMTIuNC04MS4zLDYxLjktNTQuNyw3OC42LTgzLjZjNC45LDM4LjgtMjEuMiw1NS44LTQ2LjUsNjkuOGMtNDAuNywzMy0xNC43LDczLDEwLjksODEuOWMtNS43LTE1LjktOS4zLTMyLjIsMS42LTQ2LjgNCgljMTIuNi0xNi43LDM1LjctMTguOCw1NC43LTE4YzIxLjUsMC45LDM4LjEsNC4xLDU5LjItNi4yYzE3LjMtOC40LDI1LjctMjAsMjkuNC00MC42YzUuOC0zMi4xLTI4LjgtNTIuNi00My4yLTM0LjENCgljOC42LDEuNiwxMy42LDIxLjgtMi4yLDIyLjljLTkuNSwwLjctMTQuNy03LjctMTIuNC0xNi44YzQuMi0xNi40LDIzLTIxLjIsMzMuNC0xOS44YzEyLjUsMS42LDI2LjMsNy41LDMyLjcsMTkuOA0KCWM5LjksMTksOC40LDM4LjktMi4yLDU3LjFjLTE2LjIsMjcuOC01NS42LDI5LjctODYuNywyNC40QzE1OS4zLDQ2NCwxOTAuNiw1NjUuNiwyODAuNiw1NjUuOEwyODAuNiw1NjUuOHoiLz4NCjwvc3ZnPg0K" />
      <h4><router-link to="/">МЕНЕДЖЕР РАСПИСАНИЯ ФПМИ БГУ</router-link></h4>
    </div>
    <button class="btn text-right install"
            v-if="deferredPrompt"
            @onClick.prevent="this.installApp()">Install</button>
    <router-link v-else to="/schedule">
      <button class="btn text-right install">Расписание</button>
    </router-link>
  </header>
</template>

<script>
  export default {
    name: "TopNav",
    data() {
      return {
        deferredPrompt: null
      };
    },
    created() {
      window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
      });
      window.addEventListener("appinstalled", () => {
        this.deferredPrompt = null;
      });
    },
    methods: {
      async installApp() {
        this.deferredPrompt.prompt();
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    position: fixed;
    width: 100vw;
    min-height: 4.3rem;
    background: rgba(255,255,255,1);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25);
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    padding: 0 10% 0 10%;
    margin: 0;
  }
  header h4{
    padding: 10px 0 0 5px;
    color: #0a0a0a;
  }
  header h4 a{
    color: #0a0a0a;
    text-decoration: none;
  }
  .install{
    font-size: 1.2em;
    color: #fff;
    background: #3740ff;
    padding: 5px 25px 5px 25px;
  }
  .install:hover{
    background: #000ad1;
  }
</style>
