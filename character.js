import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const characterElem = document.querySelector("[data-character]")
const JUMP_SPEED = 0.25
const GRAVITY = 0.0010
const CHARACTER_FRAME_COUNT = 5 
const FRAME_TIME = 100

let isJumping
let characterFrame
let currentFrameTime
let yVelocity
export function setupCharacter() {
  isJumping = false
  characterFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(characterElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateCharacter(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getCharacterRect() {
  return characterElem.getBoundingClientRect()
}

export function setCharacterLose() {
  characterElem.src = "imgs/dead.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    characterElem.src = `imgs/jump.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    characterFrame = (characterFrame + 1) % CHARACTER_FRAME_COUNT
    characterElem.src = `imgs/character-run-${characterFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(characterElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(characterElem, "--bottom") <= 0) {
    setCustomProperty(characterElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
