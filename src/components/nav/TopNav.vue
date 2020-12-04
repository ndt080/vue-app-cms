<template>
  <div class="topNav" >
    <header class="text-left animate__animated animate__zoomIn" style="display: inline-flex">
      <img alt="logo"
           width="35"
           height="35"
           :src="require(`@/assets/img/sche1.svg`)"
           />
      <p>&nbsp; &nbsp;</p>
      <p><router-link to="/">schedule.fpmi</router-link></p>
    </header>
    <section class="nav animate__animated animate__zoomIn">
        <ul class="nav__links">
          <li><router-link to="/">Главная</router-link></li>
          <li> <router-link to="/About">О прокте</router-link></li>
          <li> <router-link to="/faq">FAQ</router-link></li>
        </ul>
    </section>



    <div class="text-right animate__animated animate__zoomIn" style="display: inline-flex">
      <router-link to="/schedule">
        <button class="btn text-right install">Расписание</button>
      </router-link>

      <div class="dropdown">
        <a href="#" data-toggle="dropdown">
          <img alt="logo"
               width="50rem"
               :src="require(`@/assets/img/2.svg`)"
          />
        </a>
        <section class="dropdown-menu">
            <DropNav />
        </section>
      </div>
    </div>


  </div>
</template>

<script>
  import DropNav from "@/components/nav/DropNav";
  export default {
    name: "TopNav",
    components: {DropNav}
  }
</script>


<style scoped>
  header{
    max-width: 15rem;
  }
  .topNav {
    display: flex;
    position: fixed;
    width: 100%;
    height: 4.3rem;
    background: rgba(255,255,255,1);
    box-shadow: 0 4px 8px rgba(0,0,0,0.25);
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    padding: 0 1rem 0 1rem;
  }
  .topNav header{
    font-size: 1.5em;
    padding: 10px 0 0 0;
  }
  .topNav header p{
    padding: 0 0 0 5px;
  }
  .topNav header p a{
    color: #1f1f1f;
    text-decoration: none;
  }
  .topNav header img{
    margin: 5px 0 0 5px;
  }

  .install{
    font-size: 1.2em;
    color: #fff;
    background: #3740ff;
    padding: 5px 25px 5px 25px;
    margin: 5px 1.2rem 0 0;
  }
  .install:hover{
    background: #000ad1;
    color: #fff;
  }

  .nav__links {
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    padding: 10px 0 0 5px;
    list-style: none;
  }
  .nav__links li {
    padding: 0 20px 0 0;
  }
  .nav__links li a {
    color: #1f1f1f;
    text-decoration: none;
    padding-bottom: 5px;
  }
  .nav__links li a:hover {
    border-bottom: 3px solid #1f1f1f;
  }

  section.dropdown-menu .links{
    display: none;
  }
  @media (max-width: 800px) {
    header {
      padding: 0 2% 0 2%;
    }
    header p{
      font-size: 1em;
      padding: 10px 0 0 5px;
    }
    section.nav .nav__links{
      display: none;
    }
    section.dropdown-menu .links{
      display: flex;
      list-style: none;
      flex-direction: column;
    }
    section.dropdown-menu .links a{
      text-decoration: none;
      font-size: 1.25em;
      color: #0a0a0a;
    }
  }
</style>
