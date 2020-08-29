<template>
    <div class="faq">
        <div class="card-deck" style="padding: 0; margin: 0;">
            <a><p class="site-header-text">ЧаВо [FAQ]</p></a>
        </div>
        <ul class="list-group">
            <li class="list-group-item">
                <a class="dropdown-toggle" data-toggle="collapse" href="#collapseTimeLess">
                    title
                </a>
                <section class="row collapse" id="collapseTimeLess">
                    <div class="col-md-1 text-form-group">
                        content
                    </div>
                </section>
            </li>
            <li class="list-group-item">

            </li>
            <li class="list-group-item">

            </li>
            <li class="list-group-item">

            </li>
            <li class="list-group-item">

            </li>
        </ul>


    </div>
</template>

<script>
    export default {
        name: "FAQ",
        metaInfo:{
            title: 'FAQ'
        },
    }
</script>

<style scoped>
    .faq{
        display: block;
        width: 100%;
        padding-right: 2rem;
    }

</style>
