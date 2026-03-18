const parcelPicker = () => {
  let gameOptions = {
    speed: 0.6,
    size: 40,
    color: 'oklch(0.6 0.6 150)',
    lightsOn: false,
    parcels: 15,
    highScore: 0
  }
  const savedOptions = localStorage.getItem('gameOptions')
  if (savedOptions) {
    gameOptions = JSON.parse(savedOptions)
  }
  let parcelScore = 0
  const acceleration = 0.15
  const halfHeight = (gameOptions.size * 1.5) / 2
  let start = false

  const controlDiv = document.createElement('div')
  controlDiv.classList.add('mb-form')
  controlDiv.style.zIndex = '9999'
  controlDiv.style.top = '20px'
  controlDiv.style.right = '20px'
  controlDiv.style.backdropFilter = 'blur(2px)'
  controlDiv.style.backgroundColor = 'oklch(0.95 0 0 / 0.6)'
  controlDiv.style.display = 'flex'
  controlDiv.style.flexDirection = 'column'
  controlDiv.style.gap = '10px'
  controlDiv.style.padding = '10px'
  controlDiv.style.borderRadius = '4px'
  controlDiv.style.position = 'fixed'
  controlDiv.style.boxShadow = '0 2px 2px 0 oklch(0 0 0/10%),0 1px 5px 0 oklch(0 0 0/12%)'

  const heading = document.createElement('h2')
  heading.classList.add('text-1.25r')
  heading.innerText = 'Driver Game'

  const fieldset = document.createElement('fieldset')
  fieldset.style.display = 'flex'
  fieldset.style.flexDirection = 'column'
  const legend = document.createElement('legend')
  legend.innerText = 'Color'
  fieldset.appendChild(legend)

  const labelGreen = document.createElement('label')
  labelGreen.innerText = 'Green'
  const inputColorGreen = document.createElement('input')
  inputColorGreen.type = 'radio'
  inputColorGreen.name = 'color'
  inputColorGreen.value = 'oklch(0.6 0.6 150)'
  inputColorGreen.checked = gameOptions.color === inputColorGreen.value
  labelGreen.prepend(inputColorGreen)
  fieldset.appendChild(labelGreen)

  const labelRed = document.createElement('label')
  labelRed.innerText = 'Red'
  const inputColorRed = document.createElement('input')
  inputColorRed.type = 'radio'
  inputColorRed.name = 'color'
  inputColorRed.value = 'oklch(0.4 0.6 360)'
  inputColorRed.checked = gameOptions.color === inputColorRed.value
  labelRed.prepend(inputColorRed)
  fieldset.appendChild(labelRed)

  const labelSpeed = document.createElement('label')
  labelSpeed.innerText = 'Speed'
  const inputSpeed = document.createElement('input')
  inputSpeed.placeholder = '0.6'
  inputSpeed.type = 'number'
  inputSpeed.max = '0.8'
  inputSpeed.min = '0.01'
  inputSpeed.step = '0.01'
  inputSpeed.value = gameOptions.speed.toString()
  labelSpeed.appendChild(inputSpeed)

  const labelSize = document.createElement('label')
  labelSize.innerText = 'Size'
  const inputWidth = document.createElement('input')
  inputWidth.placeholder = '40'
  inputWidth.type = 'number'
  inputWidth.max = '80'
  inputWidth.min = '30'
  inputWidth.step = '1'
  inputWidth.value = gameOptions.size.toString()
  labelSize.appendChild(inputWidth)

  const labelLights = document.createElement('label')
  labelLights.innerText = 'Lights'
  const inputLights = document.createElement('input')
  inputLights.type = 'checkbox'
  inputLights.checked = gameOptions.lightsOn
  labelLights.prepend(inputLights)

  const score = document.createElement('div')
  score.classList.add('parcel-score')
  const scoreSpan = document.createElement('span')
  score.innerText = 'Parcels: '
  scoreSpan.innerText = `${parcelScore}`
  score.appendChild(scoreSpan)

  const highscoreContainer = document.createElement('div')
  highscoreContainer.classList.add('parcel-highscore')
  const highscoreSpan = document.createElement('span')
  highscoreContainer.innerText = 'Highscore: '
  highscoreSpan.innerText = `${gameOptions.highScore}`
  highscoreContainer.appendChild(highscoreSpan)

  const parcelsResetBtn = document.createElement('button')
  parcelsResetBtn.classList.add('btn', 'btn--green')
  parcelsResetBtn.innerText = 'Get parcels'
  parcelsResetBtn.addEventListener('click', () => {
    gameOptions.parcels = Math.floor(Math.random() * 10 + 5)
    document.body.appendChild(truck)
    start = true
  })

  const truck = document.createElement('div')
  truck.classList.add('truck')
  gameOptions.lightsOn && truck.classList.add('truck-lights')
  truck.style.position = 'absolute'
  truck.style.backgroundColor = gameOptions.color
  truck.style.width = `${gameOptions.size}px`
  truck.style.aspectRatio = '2/4'
  truck.style.top = '0'
  truck.style.left = '0'
  truck.style.transformOrigin = '50% 25%'
  truck.style.zIndex = '999'
  truck.style.borderRadius = '10px'

  const styling = document.createElement('style')
  styling.innerText = `
      .truck {
        &::before {
          content: '';
          top: calc(100% / 6);
          left: 50%;
          position: absolute;
          width: calc(100% - 8px);
          height: calc(100% / 5);
          background: oklch(0.4 0 0);
          transform: translateX(-50%);
          border-radius: 3px;
        }
        &::after {
          content: '';
          bottom: 5px;
          left: 50%;
          position: absolute;
          width: calc(100% - 8px);
          height: calc(100% / 20);
          background: oklch(0.4 0 0);
          transform: translateX(-50%);
          border-radius: 3px;
        }
        &.truck-lights {
          box-shadow:
            0 calc(-100px * 2) 65px 20px oklch(1 1 115 / 0.3),
            0 calc(-100px * 3) 100px 20px oklch(1 1 115 / 0.1);
        }
      }`

  controlDiv.appendChild(heading)
  controlDiv.appendChild(fieldset)
  controlDiv.appendChild(labelLights)
  controlDiv.appendChild(labelSpeed)
  controlDiv.appendChild(labelSize)
  controlDiv.appendChild(score)
  controlDiv.appendChild(highscoreContainer)
  controlDiv.appendChild(parcelsResetBtn)
  document.body.appendChild(controlDiv)
  document.body.appendChild(styling)

  function createParcels(onlyPB:boolean, parcels:number) {
    for (let i = 0; i < parcels; i++) {
      const parcel = document.createElement('div')
      parcel.classList.add('parcel')
      parcel.style.backgroundColor = 'oklch(0.65 0.07 100)'
      parcel.style.position = 'absolute'
      parcel.style.zIndex = '998'
      parcel.style.boxShadow = '0 3px 4px oklch(0.2 0 0 / 0.6)'
      if (!onlyPB && i < Math.floor(Math.random() * 7)) {
        parcel.classList.add('wrong')
        parcel.style.backgroundColor = 'oklch(0.7 0.1 220)'
      }
      parcel.style.left = Math.random() * window.innerWidth + 'px'
      parcel.style.top = Math.random() * window.innerHeight + 'px'
      parcel.style.rotate = Math.random() * 360 + 'deg'
      parcel.style.width = Math.random() * 20 + 10 + 'px'
      parcel.style.height = Math.random() * 20 + 10 + 'px'
      document.body.appendChild(parcel)
    }
  }

  const colorInputs = document.querySelectorAll('input[name="color"]')
  colorInputs.forEach((input) => {
    input.addEventListener('change', (e:any) => {
      gameOptions.color = e.currentTarget.value
      truck.style.backgroundColor = gameOptions.color
      localStorage.setItem('gameOptions', JSON.stringify(gameOptions))
    })
  })

  inputSpeed.addEventListener('change', (e:any) => {
    gameOptions.speed = Number(e.currentTarget.value) <= 0.8 && Number(e.currentTarget.value) >= 0.1 ? Number(e.currentTarget.value) : gameOptions.speed
    localStorage.setItem('gameOptions', JSON.stringify(gameOptions))
  })

  inputWidth.addEventListener('change', (e:any) => {
    gameOptions.size = Number(e.currentTarget.value) <= 80 && Number(e.currentTarget.value) >= 30 ? Number(e.currentTarget.value) : gameOptions.size
    truck.style.width = `${gameOptions.size}px`
    localStorage.setItem('gameOptions', JSON.stringify(gameOptions))
  })

  inputLights.addEventListener('change', (e:any) => {
    gameOptions.lightsOn = e.currentTarget.checked
    gameOptions.lightsOn ? truck.classList.add('truck-lights') : truck.classList.remove('truck-lights')
    localStorage.setItem('gameOptions', JSON.stringify(gameOptions))
  })

  let mouseX = 0
  let mouseY = 0

  let x = window.innerWidth / 2
  let y = document.documentElement.scrollHeight / 2

  let vx = 0
  let vy = 0

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function isTouching(el1:HTMLElement, el2:HTMLElement) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    return !(
        r1.right < r2.left ||
        r1.left > r2.right ||
        r1.bottom < r2.top ||
        r1.top > r2.bottom
    );
  }

  let parcelElements = document.querySelectorAll('.parcel')

  parcelsResetBtn.addEventListener('click', () => {
    createParcels(false, gameOptions.parcels)
    parcelElements = document.querySelectorAll('.parcel')
  })

  function checkCollisions() {
    parcelElements = document.querySelectorAll('.parcel')
    parcelElements.forEach((el:any) => {
      parcelsResetBtn.disabled = el.classList.length === 1
      if (isTouching(truck, el)) {
        if (el.classList.contains('wrong')) {
          createParcels(true, parcelScore)
          parcelScore = 0
          scoreSpan.innerText = `${parcelScore}`
        } else {
          parcelScore++
          scoreSpan.innerText = `${parcelScore}`
          gameOptions.highScore = parcelScore > gameOptions.highScore ? parcelScore : gameOptions.highScore
          highscoreSpan.innerText = parcelScore > gameOptions.highScore ? `${parcelScore}` : `${gameOptions.highScore}`
        }
        localStorage.setItem('gameOptions', JSON.stringify(gameOptions))
        el.remove()
      }
    });
  }

  function drive() {
    // direction toward mouse
    const dx = mouseX - x
    const dy = mouseY - y

    // accelerate toward mouse
    vx += dx * acceleration * 0.07
    vy += dy * acceleration * 0.07

    // speed (slows movement naturally)
    vx *= gameOptions.speed
    vy *= gameOptions.speed

    // move truck
    x += vx
    y += vy

    // rotation based on velocity direction
    const angle = Math.atan2(vy, vx)
    const offsetX = Math.cos(angle) * halfHeight
    const offsetY = Math.sin(angle) * halfHeight

    if (start) {
      truck.style.transform =
          `translate(${x + offsetX}px, ${y + offsetY}px) translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`
    }

    checkCollisions()
    requestAnimationFrame(drive)
  }
  drive()
}

export default parcelPicker