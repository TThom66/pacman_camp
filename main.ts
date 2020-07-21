namespace SpriteKind {
    export const Eaten = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile3, function (sprite, location) {
    info.changeScoreBy(25)
    tiles.setTileAt(location, myTiles.transparency16)
    Blinky.setImage(img`
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . 8 8 8 8 8 8 8 8 . . . . 
        . . . 8 8 8 8 8 8 8 8 8 8 . . . 
        . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
        . . 8 8 d d d 8 8 d d d 8 8 . . 
        . 8 8 8 d f f 8 8 d f f 8 8 8 . 
        . 8 8 8 d d d 8 8 d d d 8 8 8 . 
        . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 . . 8 8 8 . . 8 8 8 . . 8 8 
        8 . . . . 8 . . . . 8 . . . . 8 
        `)
    info.startCountdown(10)
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile4, function (sprite, location) {
    tiles.setTileAt(location, myTiles.transparency16)
    music.pewPew.play()
    info.changeScoreBy(1)
    pelletCount += -1
})
game.onGameUpdateWithHeading(function () {
    console.log(pelletCount)
    controller.moveSprite(paccy, 50, 50)
    scene.cameraFollowSprite(paccy)
    if (paccy.x <= 16) {
        paccy.x = 239
    }
    if (paccy.x >= 240) {
        paccy.x = 17
    }
    if (pelletCount == 0) {
        game.over(true, effects.confetti)
    }
    if (scene.spriteContainedWithinTile(Blinky)) {
        blinkyCollision()
    }
    if (Blinky.vx == 0 && Blinky.vy == 0) {
        Blinky.vx = 90 * (randint(0, 1) - 0.5)
        Blinky.vy = 90 * (randint(0, 1) - 0.5)
    }
    if (Blinky.x <= 16) {
        Blinky.x = 239
    }
    if (Blinky.x >= 240) {
        Blinky.x = 17
    }
})
function blinkyCollision () {
    blinkyPossibleDirections = []
    if (!(scene.isTileAWallAt(scene.getCoordinateNTilesAwayFromTile(1, TravelDirection.Ahead, Blinky)))) {
        blinkyPossibleDirections.push(Math.mod(sprites.heading(Blinky) + 0, 360))
    }
    if (!(scene.isTileAWallAt(scene.getCoordinateNTilesAwayFromTile(1, TravelDirection.Right, Blinky)))) {
        blinkyPossibleDirections.push(Math.mod(sprites.heading(Blinky) + 90, 360))
    }
    if (!(scene.isTileAWallAt(scene.getCoordinateNTilesAwayFromTile(1, TravelDirection.Left, Blinky)))) {
        blinkyPossibleDirections.push(Math.mod(sprites.heading(Blinky) - 90, 360))
    }
    blinkyDir(arrays.choose(blinkyPossibleDirections))
}
function blinkyDir (num: number) {
    if (num == 90) {
        Blinky.setVelocity(45, 0)
    }
    if (num == 0) {
        Blinky.setVelocity(0, -45)
    }
    if (num == 270) {
        Blinky.setVelocity(-45, 0)
    }
    if (num == 180) {
        Blinky.setVelocity(0, 45)
    }
}
info.onCountdownEnd(function () {
    Blinky = sprites.create(img`
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . 2 2 d d d 2 2 d d d 2 2 . . 
        . 2 2 2 d f f 2 2 d f f 2 2 2 . 
        . 2 2 2 d d d 2 2 d d d 2 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 . . 2 2 2 . . 2 2 2 . . 2 2 
        2 . . . . 2 . . . . 2 . . . . 2 
        `, SpriteKind.Enemy)
    Blinky.setPosition(104, 136)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(75)
    Blinky = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f f f f f f . . . . 
        . . . f f f f f f f f f f . . . 
        . . f f f f f f f f f f f f . . 
        . . f f d d d f f d d d f f . . 
        . f f f d f f f f d f f f f f . 
        . f f f d d d f f d d d f f f . 
        . f f f f f f f f f f f f f f . 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f . . f f f . . f f f . . f f 
        f . . . . f . . . . f . . . . f 
        `, SpriteKind.Eaten)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    lives += -1
    info.changeScoreBy(-100)
    if (lives > 0) {
        paccy.setPosition(120, 200)
        Blinky.setPosition(104, 136)
    } else {
        game.over(false)
    }
})
let blinkyPossibleDirections: number[] = []
let pelletCount = 0
let Blinky: Sprite = null
let paccy: Sprite = null
let lives = 0
tiles.setTilemap(tiles.createTilemap(hex`1000100001010101010101010101010101010101010303030301030303030103030303010103010103010301010301030101030101020303030303030303030303030201010101010301010101010103010101010101010103010101010101030101010100000000030303030303030300000000010101010301000101000103010101010103030303010000000001030303030101030101030101010101010301010301010303030303030101030303030303010101010103010301010301030101010101030303030303000003030303030301010201010301030101030103010102010103030303010303030301030303030101010101010101010101010101010101`, img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 . . . . 2 . . . . 2 . . . . 2 
    2 . 2 2 . 2 . 2 2 . 2 . 2 2 . 2 
    2 . . . . . . . . . . . . . . 2 
    2 2 2 2 . 2 2 2 2 2 2 . 2 2 2 2 
    2 2 2 2 . 2 2 2 2 2 2 . 2 2 2 2 
    . . . . . . . . . . . . . . . . 
    2 2 2 2 . 2 . 2 2 . 2 . 2 2 2 2 
    2 . . . . 2 . . . . 2 . . . . 2 
    2 . 2 2 . 2 2 2 2 2 2 . 2 2 . 2 
    2 . . . . . . 2 2 . . . . . . 2 
    2 2 2 2 . 2 . 2 2 . 2 . 2 2 2 2 
    2 . . . . . . . . . . . . . . 2 
    2 . 2 2 . 2 . 2 2 . 2 . 2 2 . 2 
    2 . . . . 2 . . . . 2 . . . . 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,myTiles.tile2,myTiles.tile3,myTiles.tile4], TileScale.Sixteen))
info.setScore(300)
lives = 3
paccy = sprites.create(img`
    . . . . . . . 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . . . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    `, SpriteKind.Player)
paccy.setPosition(120, 200)
Blinky = sprites.create(img`
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . 2 2 d d d 2 2 d d d 2 2 . . 
    . 2 2 2 d f f 2 2 d f f 2 2 2 . 
    . 2 2 2 d d d 2 2 d d d 2 2 2 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 . . 2 2 2 . . 2 2 2 . . 2 2 
    2 . . . . 2 . . . . 2 . . . . 2 
    `, SpriteKind.Enemy)
Blinky.setPosition(104, 136)
pelletCount = 100
animation.runImageAnimation(
paccy,
[img`
    . . . . . . . 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . . . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    `,img`
    . . . . . . . 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 . . . . 
    . . 5 5 5 5 5 5 5 5 5 . . . . . 
    . 5 5 5 5 5 5 5 5 5 . . . . . . 
    . 5 5 5 5 5 5 5 5 . . . . . . . 
    5 5 5 5 5 5 5 . . . . . . . . . 
    5 5 5 5 5 5 5 . . . . . . . . . 
    . 5 5 5 5 5 5 5 5 . . . . . . . 
    . 5 5 5 5 5 5 5 5 5 . . . . . . 
    . . 5 5 5 5 5 5 5 5 5 . . . . . 
    . . 5 5 5 5 5 5 5 5 5 5 . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    `,img`
    . . . . . . . 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . . . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    `,img`
    . . . . . . . 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    `],
100,
true
)
Blinky.vx = 90 * (randint(0, 1) - 0.5)
Blinky.vy = 90 * (randint(0, 1) - 0.5)
