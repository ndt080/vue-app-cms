<template>
  <div class="content">
      <div class="moderation" v-bind:class="{ 'moderation-show': isMod }">
        <div class="active close" style="opacity: 1">
          <a href="#" v-if="isLogin && isMod" @click.prevent="isModeration">
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </a>
        </div>
        <SchModeration v-if="isMod"/>
      </div>
      <div class="overlay-i" v-bind:class="{ 'moderation-show': isMod }">
        <div class="card-deck" style="padding: 0; margin: 0;">
          <a><p class="site-header-text">РАСПИСАНИЕ ЗАНЯТИЙ <span v-if="course">{{group}} ГРУППЫ {{course}} КУРСА</span></p></a>
        </div>
        <header @update-schedule="refresh()">
          <button class="btn btn-dark" v-if="isLogin && !isMod" @click.prevent="isModeration">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <span>&nbsp; РЕДАКТИРОВАТЬ</span>
          </button>
          <button class="btn btn-danger" v-if="isLogin && isMod" @click.prevent="isModeration">ОТМЕНИТЬ</button>
          <label>
            <select class="custom-select my-1 mr-sm-2"
                    @change.prevent="refresh()"
                    v-model="selected"
                    :disabled="isQSh">
              <option value="actual_week">Текущая неделя</option>
              <option value="next_week">Следующая неделя</option>
            </select>
          </label>
          <button class="btn btn-light"
                  title="Показать/закрыть очередь"
                  v-if="isLogin"
                  @click.prevent="isQueueShow">
            <img class="scroll-icon" :src="require(`@/assets/img/queue.svg`)" alt="QUEUE"/>
            ОЧЕРЕДЬ
          </button>
          <button class="btn btn-dark"
                  title="Показать/закрыть скроллбар"
                  v-if="isLogin"
                  @click.prevent="isScroll">
            <img class="scroll-icon" :src="require(`@/assets/img/scroll.svg`)" alt="Scrl"/>
          </button>
          <button class="btn btn-dark"
                  title="Обновить расписание"
                  v-if="isLogin"
                  @click.prevent="refresh">
            <img class="scroll-icon" :src="require(`@/assets/img/repeat.svg`)" alt="Repeat"/>
          </button>
        </header>
        <Loader v-if="loading"></Loader>
        <!-- Дни недели -->
        <div v-else-if="!loading && schedule">
          <section v-if="this.selected === 'actual_week'"
                   v-bind:class="{ 'card-section': !isScroller, 'card-section-with-scroll': isScroller  }">
            <Card v-if="!isQSh" v-for="(card, i) of schedule"
                  v-bind:key="card.id"
                  v-bind:i="i"
                  v-bind:card="card"
                  v-bind:lessons="card.lessons"
                  v-bind:date="card.date"
                  v-bind:title="card.title"
            />
          </section>
          <section v-if="this.selected === 'next_week'"
                   v-bind:class="{ 'card-section': !isScroller, 'card-section-with-scroll': isScroller  }">
            <Card v-if="!isQSh" v-for="(card, i) of schedule_next"
                  v-bind:key="card.id"
                  v-bind:i="i"
                  v-bind:card="card"
                  v-bind:lessons="card.lessons"
                  v-bind:date="card.date"
                  v-bind:title="card.title"
            />
          </section>
          <section v-if="isQSh"
                   v-bind:class="{ 'card-section': !isScroller, 'card-section-with-scroll': isScroller  }">
            <CardQ v-for="(card, i) of queue"
                   v-bind:key="card.id"
                   v-bind:ind="i"
                   v-bind:card="card"
                   v-bind:date="card.subject"
                   v-bind:teacher1="card.teach1"
                   v-bind:teacher2="card.teach2"
                   v-bind:people="card.people"
            />
          </section>
        </div>
        <div class="card-deck info-message" v-else-if="!loading && isNull">
          <p class="text-danger text-center">Расписание {{group}} группы {{course}} курса еще никто не заполнил. Воспользуйтесь конструктором, чтобы это сделать!</p>
        </div>

        <div class="card-deck">
          <div class="card mb-3 border card-border border card-border border card-border" style="max-width: 44rem">
            <div class="card-body card-body-text">
            </div>
          </div>
          <div class="w-100 d-none d-sm-block d-md-none"><!-- wrap every card on sm--></div>
          <div class="card mb-3 border card-border border card-border border card-border" style="max-width: 44rem">
            <div class="card-body card-body-text">
              <ul class="list-group">
                <li class="list-group-item list-group-item-success">
                  ПОЛЕЗНОЕ
                </li>
                <li class="list-group-item list-group-item-success">
                  <div class="list-group">
                    <a class="btn btn-primary text-left" href="https://student.bsu.by/PersonalCabinet" target="_blank">
                      <img width="15px" height="20px"
                           alt="BSU"
                           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADxCAYAAAAp8E4AAAAACXBIWXMAAC4jAAAuIwF4pT92AAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA5LTA3VDEwOjIyOjMyKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wOS0wN1QxMDoyNDozNCswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wOS0wN1QxMDoyNDozNCswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiZGYyMjdkOS0wYWNkLTFlNDYtYTA5ZC1jMTQ2MjE3NGNjMWIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxYWFkZTY3Yi0xNTA3LTc4NDgtYTE4My04MzVhOWU2NGNhNTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphOGM4ZWEwYy1mMGE5LTJjNGMtYWFkNC03Y2Q0NjM5ZTNiZDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE4YzhlYTBjLWYwYTktMmM0Yy1hYWQ0LTdjZDQ2MzllM2JkMCIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0wN1QxMDoyMjozMiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZGYyMjdkOS0wYWNkLTFlNDYtYTA5ZC1jMTQ2MjE3NGNjMWIiIHN0RXZ0OndoZW49IjIwMjAtMDktMDdUMTA6MjQ6MzQrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TEMW0AAAGt0lEQVR42u3dUW7rMAxEUe5/03wL6Gsa2aI0Q94A/GuRQD6gbIqSIzODID7EX5///h8DR7xB9SsuBo94i+q/uBhAYgeqH7gYRGInrAQW8RZWAIuogvUrLgaRePs0CCyirMwALGL7VBhfV00JYrEgCiziNa4AFnENIINCAIsAFgEsgtj/9MjAEMAigEUAiyD2V+cZHKICFovQwxAcW0tkwOdlF2ARZRkGWIQkLjZTEB9BAIuQyVps/yJKstZX5SsGGlglB4Qw0MDKTaiABawSWBwK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" />
                      <span>&nbsp; &nbsp; &nbsp; BSU. Личный кабинет</span>
                    </a>
                    <a class="btn btn-dark text-left" href="https://acm.bsu.by/" target="_blank">
                      <img width="20px" height="20px"
                           alt="Irunner"
                           src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzE5Q0ZGQzsiIGQ9Ik0xMjEsOTguNUg0NWMtOC4yOTEsMC0xNS02LjcwOS0xNS0xNXM2LjcwOS0xNSwxNS0xNWg3NmM4LjI5MSwwLDE1LDYuNzA5LDE1LDE1DQoJCVMxMjkuMjkxLDk4LjUsMTIxLDk4LjV6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzE5Q0ZGQzsiIGQ9Ik0xMjEsMjE4LjVINDVjLTguMjkxLDAtMTUtNi43MDktMTUtMTVzNi43MDktMTUsMTUtMTVoNzZjOC4yOTEsMCwxNSw2LjcwOSwxNSwxNQ0KCQlTMTI5LjI5MSwyMTguNSwxMjEsMjE4LjV6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzE5Q0ZGQzsiIGQ9Ik05MSwxNTguNUgxNWMtOC4yOTEsMC0xNS02LjcwOS0xNS0xNXM2LjcwOS0xNSwxNS0xNWg3NmM4LjI5MSwwLDE1LDYuNzA5LDE1LDE1DQoJCVM5OS4yOTEsMTU4LjUsOTEsMTU4LjV6Ii8+DQo8L2c+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMjg2NEYwOyIgZD0iTTI4MC4xNDEsNTEuMDM5Yy0xMS45MjQtNy45MjUtMjcuNzQ0LTYuMzU3LTM3Ljg1MiwzLjc1bC04Mi41LDgyLjUNCgkJYy0xMS43MTksMTEuNzE5LTExLjcxOSwzMC43MDMsMCw0Mi40MjJzMzAuNzAzLDExLjcxOSw0Mi40MjIsMGw2NS4xMTItNjUuMTEybDQ2LjU5MywzMy41NjNsNjMuNzI0LTI5LjYyM0wyODAuMTQxLDUxLjAzOXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMjg2NEYwOyIgZD0iTTIxOS43ODksMjQyLjI4OWwtMTk1LDE5NWMtMTEuNzE5LDExLjcxOS0xMS43MTksMzAuNzAzLDAsNDIuNDIyDQoJCWMxMS43MTgsMTEuNzE4LDMwLjcwMywxMS43MTksNDIuNDIyLDBMMjQxLDMwNS45MjJMMjE5Ljc4OSwyNDIuMjg5eiIvPg0KPC9nPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzMzODlGRjsiIGQ9Ik00ODIsMjAzLjVoLTkxdi02MGMwLTExLjc5My03LjEzNC0yMi45NTUtMTguNTM2LTI3LjY4NGMtMTEuNDgtNC43NDgtMjQuNDAxLTEuODEyLTMyLjY4NCw2LjQ4Mg0KCQlMMjE5Ljc4OSwyNDIuMjg5Yy0xMS43MTksMTEuNzE5LTExLjcxOSwzMC43MDMsMCw0Mi40MjJsNjguNzg5LDY4Ljc4OWwtODMuNzg5LDgzLjc4OWMtMTEuNzE5LDExLjcxOS0xMS43MTksMzAuNzAzLDAsNDIuNDIyDQoJCWMxMS43MTgsMTEuNzE4LDMwLjcwMywxMS43MTksNDIuNDIyLDBsMTA1LTEwNWMxMS43MTktMTEuNzE5LDExLjcxOS0zMC43MDMsMC00Mi40MjJMMjgzLjQyMiwyNjMuNUwzMzEsMjE1LjkyMlYyMzMuNQ0KCQljMCwxNi41NjcsMTMuNDMzLDMwLDMwLDMwaDEyMWMxNi41NjcsMCwzMC0xMy40MzMsMzAtMzBTNDk4LjU2NywyMDMuNSw0ODIsMjAzLjV6Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMzM4OUZGOyIgY3g9IjQzNiIgY3k9IjY4LjUiIHI9IjQ1Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
                      <span>&nbsp; &nbsp; BSU. IRunner</span>
                    </a>
                    <a class="btn btn-light text-left" href="https://edufpmi.bsu.by/login" target="_blank">
                      <img width="20px" height="20px"
                           alt="EduFPMI"
                           src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzQ1NUE2NDsiIGQ9Ik0zMDAuMzc5LDE4LjIxOWwtOC44NTMtOC44NTNDMjg1LjUxMiwzLjM5MiwyNzcuMzg4LDAuMDI3LDI2OC45MTIsMEgyNDMuOTENCgljLTguNDgzLDAuMDIyLTE2LjYxNiwzLjM4Ny0yMi42MzUsOS4zNjVsLTguODMyLDguODUzYy01Ljk3Myw2LjAxMy05LjMzOCwxNC4xMzctOS4zNjUsMjIuNjEzdjY1LjgzNWgxMDYuNjY3VjQwLjgzMg0KCUMzMDkuNzE3LDMyLjM1NiwzMDYuMzUyLDI0LjIzMiwzMDAuMzc5LDE4LjIxOXoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkUwODI7IiBkPSJNMjU2LjQxMSw0MjYuNjY3Yy01Ljg5MSwwLTEwLjY2Nyw0Ljc3Ni0xMC42NjcsMTAuNjY3djY0YzAsNS44OTEsNC43NzYsMTAuNjY3LDEwLjY2NywxMC42NjcNCgkJYzUuODkxLDAsMTAuNjY3LTQuNzc2LDEwLjY2Ny0xMC42Njd2LTY0QzI2Ny4wNzgsNDMxLjQ0MiwyNjIuMzAyLDQyNi42NjcsMjU2LjQxMSw0MjYuNjY3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkUwODI7IiBkPSJNMTc2LjQxMSw0MDUuMzMzYy01LjEwMi0yLjk0NS0xMS42MjUtMS4xOTgtMTQuNTcxLDMuOTA0bC0zMiw1NS40NjcNCgkJYy0zLjE2LDQuOTcyLTEuNjkyLDExLjU2NCwzLjI3OSwxNC43MjRzMTEuNTY0LDEuNjkyLDE0LjcyNC0zLjI3OWMwLjE2MS0wLjI1MywwLjMxMS0wLjUxMywwLjQ1LTAuNzc4bDMyLTU1LjQ2Nw0KCQlDMTgzLjI0Myw0MTQuODA4LDE4MS41MDUsNDA4LjI4NiwxNzYuNDExLDQwNS4zMzN6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRTA4MjsiIGQ9Ik0xMDMuMjgsMzQyLjc2M2wtNTUuNDY3LDMyYy01LjIyLDIuNzMxLTcuMjM4LDkuMTc2LTQuNTA3LDE0LjM5NnM5LjE3Niw3LjIzOCwxNC4zOTYsNC41MDcNCgkJYzAuMjY2LTAuMTM5LDAuNTI1LTAuMjg5LDAuNzc4LTAuNDVsNTUuNDY3LTMyYzQuOTcyLTMuMTYsNi40NC05Ljc1MywzLjI3OS0xNC43MjQNCgkJQzExNC4yNTMsMzQxLjgxNCwxMDguMTkyLDM0MC4xOTMsMTAzLjI4LDM0Mi43NjN6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRTA4MjsiIGQ9Ik0zNTAuOTgyLDQwOS4xMzFjLTMuMTYtNC45NzItOS43NTMtNi40NC0xNC43MjQtMy4yNzljLTQuNjc4LDIuOTc0LTYuMjk4LDkuMDM0LTMuNzI5LDEzLjk0Ng0KCQlsMzIsNTUuNDY3YzIuNzMxLDUuMjIsOS4xNzYsNy4yMzgsMTQuMzk2LDQuNTA3YzUuMjItMi43MzEsNy4yMzgtOS4xNzYsNC41MDctMTQuMzk2Yy0wLjEzOS0wLjI2Ni0wLjI4OS0wLjUyNS0wLjQ1LTAuNzc4DQoJCUwzNTAuOTgyLDQwOS4xMzF6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRTA4MjsiIGQ9Ik00NjQuOTY2LDM3NC43NjNsLTU1LjQ2Ny0zMmMtNC45NzEtMy4xNi0xMS41NjQtMS42OTItMTQuNzI0LDMuMjc5DQoJCWMtMy4xNiw0Ljk3Mi0xLjY5MiwxMS41NjQsMy4yNzksMTQuNzI0YzAuMjUzLDAuMTYxLDAuNTEzLDAuMzExLDAuNzc4LDAuNDVsNTUuNDY3LDMyYzUuMjIsMi43MzEsMTEuNjY1LDAuNzEzLDE0LjM5Ni00LjUwNw0KCQlDNDcxLjI2NCwzODMuNzk3LDQ2OS42NDMsMzc3LjczNiw0NjQuOTY2LDM3NC43NjN6Ii8+DQo8L2c+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDMTA3OyIgZD0iTTM0Ni40OCwxNzAuMjE5Yy0xLjI0NS0wLjkyOS0yLjEwOS0yLjI3OC0yLjQzMi0zLjc5N2MtNC4yNjctMjIuMTY1LTE1LjcwMS04MS4wNjctNTEuMDcyLTgxLjA2Nw0KCWgtNzMuMTMxYy0zNS40NTYsMC00Ni44MDUsNTkuMDI5LTUxLjIsODEuMjhjLTAuMzU1LDEuNDU0LTEuMjA4LDIuNzM3LTIuNDExLDMuNjI3Yy01Ni4wMzEsNDUuMDEtNjQuOTY2LDEyNi45Mi0xOS45NTYsMTgyLjk1MQ0KCWMzLjM5MSw0LjIyMSw3LjA0Miw4LjIyNywxMC45MzIsMTEuOTkzYzI2LjQ0NiwyNS45ODcsNjIuMTI0LDQwLjQxOSw5OS4yLDQwLjEyOGgyLjMwNGMzNy43ODQtMC43NDYsNzMuNjkxLTE2LjYwNiw5OS42OTEtNDQuMDMyDQoJYzI0LjU1My0yNS4yNjUsMzcuNzg5LTU5LjQyMiwzNi42NzItOTQuNjM1QzM5My4zNCwyMjkuMDY3LDM3NS42NjUsMTkzLjk4OSwzNDYuNDgsMTcwLjIxOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
                      <span>&nbsp; &nbsp; BSU. EduFPMI</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div class="card-footer">

            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    import Card from "../components/schedule/Card";
    import {mapMutations, mapActions, mapGetters} from "vuex";
    import SchModeration from "../components/schedule/SchModeration";
    import CardQ from "../components/schedule/queue/CardQ";
    export default {
        name: "Schedule",
        metaInfo:{
          title: 'Расписание'
        },
        components: {CardQ, SchModeration, Card},
        data() {
            return{
                isLogin: this.isAuth(),
                isWeek: false,
                selected: 'actual_week',
                isMod: false,
                loading: true,
                isNull: false,
                isScroller: false,
                isQSh: false,
                date: new Date(),
              interval: null
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchSchedule')
            await this.$store.dispatch('fetchQueue')
            this.loading = false
             if(!this.$store.getters.schedule){
                 this.isNull = true
            }
             this.interval = setInterval(() => {
                this.date = new Date()
             }, 1000)
        },
        methods:{
            isAuth(){
                const auth = localStorage.getItem('userAuth')
                return auth === 'yes';
            },
            isModeration(){
                return this.isMod = !this.isMod
            },
            isScroll(){
                return this.isScroller = !this.isScroller
            },
            isQueueShow(){
                return this.isQSh = !this.isQSh
            },
            async refresh(){
                this.loading = true;
                await this.$store.dispatch('fetchSchedule')
                this.isNull = !this.$store.getters.schedule;
                this.loading = false
            }
        },
        computed:{
          schedule_next (){
            return this.$store.getters.schedule_next
          },
          schedule (){
            return this.$store.getters.schedule
          },
          course (){
            return this.$store.getters.info.course
          },
          group (){
            return this.$store.getters.info.group
          },
          queue (){
            return this.$store.getters.queue
          }
        },
      beforeDestroy() {
          clearInterval(this.interval)
      }
    }
</script>

<style scoped>
  .content{
    display: inline-flex;
  }
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 11;
  }
  .moderation{
    display: none;
    width: 0;
  }
  .moderation.moderation-show{
    display: block;
    position: relative;
    width: 35vw;
    background: rgba(255,255,255, 0.2);
    box-shadow: 0 0 0 rgba(0,0,0,0.25), 15px 0 10px rgba(0,0,0,0.22);
    padding: 1.5rem;
    margin: 0;
  }
  .overlay-i {
    padding: 0 1rem 0 2%;
    width: 94vw;
    background-attachment: scroll;
    max-width: 100%;
    min-height: 100vh;
  }
  .overlay-i.moderation-show{
    display: block;
    width: 59vw;
    max-width: 100%;
    min-height: 100vh;
    transition: all .3s ease;
  }
  @media (max-width: 800px){
    .moderation.moderation-show{
      position: absolute;
      width: 80%;
      height: 100%;
      background: #fff;
      z-index: 9;
    }
    .overlay-i.moderation-show{
      width: 94vw;
    }
  }
  .card-deck{
    width: 100%;
  }
  header button,  header label {
    margin-right: 1.3%;
  }
    .scroll-icon{
        padding-top: 0;
        padding-bottom: 0;
        height: 1.3rem;
    }
    .info-message{
        width: 100%;
        margin: 0 auto;
        padding: 0 1rem 0 0;
        font-size: 1.5em;
    }
    .list-group-item .list-group a{
      margin-bottom: 0.5rem;
    }
</style>
