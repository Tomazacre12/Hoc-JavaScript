const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')

const app ={
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Bookmaker',
            singer: 'Kobaryo',
            path: './Music/Bookmaker.mp3',
            image: './img/kobaryo.png'
        },  
        {
            name: 'Touhou 17.5: Reimu theme',
            singer: 'Dự án đông phương',
            path: './Music/reimutheme.mp3',
            image: './img/256px-Th175_cover.jpg'
        },
        {
            name: 'Touhou 17.5: tittle',
            singer: 'Dự án đông phương',
            path: './Music/y2mate.com - Touhou 175 OST Title Screen.mp3',
            image: './img/256px-Th175_cover.jpg'
        },
        {
            name: 'Narwhal',
            singer: 'Gray raven',
            path: './Music/ghostfinal4.mp3',
            image: './img/artworks-2e2yjwK2KjpmsV9C-RaidVg-t500x500.jpg'
        },    
        {
            name: 'Punishing',
            singer: 'Gray raven',
            path: './Music/ghostfinal3.mp3',
            image: './img/artworks-2e2yjwK2KjpmsV9C-RaidVg-t500x500.jpg'
        },  
        {
            name: 'MISSION REPRISE',
            singer: 'Higari minami',
            path: './Music/MISSION REPRISE.mp3',
            image: './img/artworks-2e2yjwK2KjpmsV9C-RaidVg-t500x500.jpg'
        },  
  
        {
            name: 'Hikari',
            singer: 'Gray raven',
            path: './Music/y2mate.com - GhostFinalHIKARI Punishing Gray Raven OST  九龙环城 パニシンググレイレイヴンOfficial.mp3',
            image: './img/artworks-2e2yjwK2KjpmsV9C-RaidVg-t500x500.jpg'
        }, 
        {
            name: 'Last Resort',
            singer: 'Gray raven',
            path: './Music/ghostfinal2.mp3',
            image: './img/artworks-2e2yjwK2KjpmsV9C-RaidVg-t500x500.jpg'
        },
        {
            name: 'Homu',
            singer: 'Higari minami',
            path: './Music/Tadaima Hōmu.mp3',
            image: './img/0.jpg'
        },
        {
            name: 'Cheatreal',
            singer: 'T+pazolite',
            path: './Music/y2mate.com - tpazolite  Cheatreal.mp3',
            image: './img/artworks-000528734847-3v7ajq-t500x500.jpg'
        },
         
        {
            name: 'Touhou 11: Koishi theme',
            singer: 'T+pazolite',
            path: './Music/y2mate.com - tpazolite  CENSORED.mp3',
            image: './img/artworks-000528734847-3v7ajq-t500x500.jpg'
        },
        {
            name: 'Baby dont cry',
            singer: 'kobasolo',
            path: './Music/y2mate.com - Baby dont cry  安室奈美恵full covered by コバソロ  藤川千愛.mp3',
            image: './img/maxresdefault.jpg'
        },
        {
            name: 'Touhou 6: Fall in the dark',
            singer: 'Alice Margatroid',
            path: './Music/y2mate.com - Reupload東方ボーカル Fall In The Dark ShibayanRecordsSubbed.mp3',
            image: './img/68641819_p0_master1200.jpg'
        },
          
    ],
    render: function(){
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                    </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function(){
        const cdWidth = cd.offsetWidth
        const _this = this
        // đĩa nhạc quay
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity   
        })
        cdThumbAnimate.pause()
        // phóng to, thu nhỏ
        document.onscroll = function(){
            const scrollTop = window.scrollY
            const newcdWidht = cdWidth - scrollTop

            cd.style.width = newcdWidht > 0?newcdWidht + 'px':0
            cd.style.opacity = newcdWidht / cdWidth
        }
        // xử lý khi click play
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        // khi nhạc chạy
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // khi nhạc dừng
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
             cdThumbAnimate.pause()
        }
        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        // xử lý khi tua nhạc
        progress.onchange = function(e){
            const seekTime = audio.duration  / 100 * e.target.value 
            audio.currentTime = seekTime
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage =`url(${this.currentSong.image})`
        audio.src = this.currentSong.path

    },
    start: function(){
        this.handleEvents()

        this.defineProperties()

        this.loadCurrentSong()

        this.render()
    }
}
app.start()
