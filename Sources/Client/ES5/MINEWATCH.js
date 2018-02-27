'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// [ PHILIPPIANS [ 4 [ 13] ] ]
// I CAN DO ALL THIS THROUGH HIM HWO GIVES ME STRENGTH. AMEN!

/*
    MINECRAFT PROJECT: MINEWATCH
        AUTHOR: NEWTYPESIDER
        DISCRIPTION: OVERWATCH'S EVERYTHING SUCKED INTO MINECRAFT!

        VERSION: 0.0.0
        LAST UPDATED AT: 2018 .02 .14 [ WEDENSDAY ]

        PROGRAM TYPE: SERVER > INPUT/ OUTPUT
*/

// IMPORT java.lang.*
var Thread = java.lang.Thread,
    Runnable = java.lang.Runnable;

// IMPORT java.net.*
var ServerSocket = java.net.ServerSocket,
    Socket = java.net.Socket,
    DatagramSocket = java.net.DatagramSocket,
    DatagramPacket = java.net.DatagramSocket,
    InetAddress = java.net.InetAddress;

// IMPORT java.io.*;
var DataInputStream = java.io.DataInputStream,
    DataOutputStream = java.io.DataOutputStream;

// IMPORT android.widget.*
var PopupWindow = android.widget.PopupWindow,
    RelativeLayout = android.widget.RelativeLayout,
    LayoutParams = RelativeLayout.LayoutParams,
    LinearLayout = android.widget.LinearLayout,
    Button = android.widget.Button,
    TextView = android.widget.TextView,
    Toast = android.widget.Toast;

// IMPORT android.graphics.*
var Color = android.graphics.Color,
    ColorDrawable = android.graphics.drawable.ColorDrawable,
    BitmapDrawable = android.graphics.drawable.BitmapDrawable,
    GradientDrawable = android.graphics.drawable.GradientDrawable,
    RippleDrawable = android.graphics.drawable.RippleDrawable,
    Bitmap = android.graphics.Bitmap,
    Canvas = android.graphics.Canvas,
    Paint = android.graphics.Paint,
    RectF = android.graphics.RectF,
    Typeface = android.graphics.Typeface;

// IMPORT android.view.*
var OnClickListener = android.view.View.OnClickListener,
    OnLongClickListener = android.view.View.OnLongClickListener,
    OnTouchListener = android.view.View.OnTouchListener,
    Gravity = android.view.Gravity,
    MotionEvent = android.view.MotionEvent;

// IMPORT android.context.*
var ColorStateList = android.content.res.ColorStateList;

// GET CONTEXT & SDCARD'S PATH
var context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

// CHANGE DIP TO PIXEL
var dipToPixel = function dipToPixel(dips) {
    return dips * context.getResources().getDisplayMetrics().density;
};

// GET SCREEN'S SIZE
var Screen = {
    width: context.getWindowManager().getDefaultDisplay().getWidth(),
    height: context.getWindowManager().getDefaultDisplay().getHeight()
};

// GET HARDWARE'S INFORMATION
var information = com.mojang.minecraftpe.HardwareInformation;
information.initHardwareInformation();

var androidVersion = information.getAndroidVersion();
/* ----------------------------------------------------------- */

function toast(red, green, blue, texts) {
    context.runOnUiThread(new Runnable(this.run = function () {
        try {
            var border = new GradientDrawable();
            border.setColor(Color.argb(100, red, green, blue));
            border.setStroke(2, Color.WHITE);

            var view = new TextView(context);
            view.setBackgroundDrawable(border);
            view.setPadding(dipToPixel(5), dipToPixel(5), dipToPixel(5), dipToPixel(5));

            view.setGravity(Gravity.CENTER);
            view.setTextColor(Color.WHITE);
            view.setTextSize(15);
            view.setText(texts.join(' '));

            var _toast = new Toast(context);
            _toast.setView(view);
            _toast.setDuration(Toast.LENGTH_LONG);
            _toast.show();
        } catch (error) {
            var _toast2 = new Toast.makeText(context, error.message, Toast.LENGTH_LONG).show();
        }
    }));
}

var console = {
    log: function log() {
        for (var _len = arguments.length, texts = Array(_len), _key = 0; _key < _len; _key++) {
            texts[_key] = arguments[_key];
        }

        toast(0, 0, 0, texts);
    },
    error: function error() {
        for (var _len2 = arguments.length, texts = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            texts[_key2] = arguments[_key2];
        }

        toast(255, 0, 0, texts);
    }
};

console.log(androidVersion);

/* ----------------------------------------------------------- */

var UI = function () {
    function UI() {
        _classCallCheck(this, UI);
    }

    _createClass(UI, null, [{
        key: 'profile',
        value: function profile(hero) {
            try {
                var bitmap = new Bitmap.createBitmap(2000, 2000, Bitmap.Config.ARGB_8888);
                var canvas = new Canvas(bitmap);
                var paint = new Paint();

                paint.setAntiAlias(true);
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStrokeWidth(10.0);
                paint.setARGB(255, 255, 255, 255);

                canvas.drawLine(10, 60, 10, 160, paint);
                canvas.drawLine(210, 60, 210, 160, paint); // 일직선

                canvas.drawLine(10, 60, 110, 10, paint);
                canvas.drawLine(210, 60, 110, 10, paint); // 위쪽 삼각형

                canvas.drawLine(10, 160, 110, 210, paint);
                canvas.drawLine(210, 160, 110, 210, paint); // 아래쪽 삼각형

                return bitmap;
            } catch (error) {
                console.error(error, '\nERROR LINE >> ' + error.lineNumber);
            }
        }
    }, {
        key: 'healthBar',
        value: function healthBar(constHealth, health) {
            try {
                var bitmap = new Bitmap.createBitmap(2000, 600, Bitmap.Config.ARGB_8888);
                var canvas = new Canvas(bitmap);
                var paint = new Paint();

                paint.setAntiAlias(true);
                paint.setStrokeCap(Paint.Cap.ROUND);
                paint.setStyle(Paint.Style.FILL_AND_STROKE);
                paint.setStrokeWidth(15.0);

                var constBoxNumber = Math.floor(constHealth / 25);
                var boxNumber = Math.floor(health / 25);
                var location = 50;

                var boxScale = 1000 / constHealth;

                canvas.rotate(355);
                canvas.skew(-0.15, 0);

                paint.setARGB(150, 150, 150, 150);

                for (var n = 0; n < constBoxNumber; n++) {
                    canvas.drawRoundRect(new RectF(location, 15, location += boxScale * 25, 515), 7, 7, paint);
                    location += boxScale * 7;
                    constHealth -= 25;
                }

                canvas.drawRoundRect(new RectF(location, 15, location + boxScale * constHealth, 515), 7, 7, paint);

                paint.setARGB(255, 255, 255, 255);

                location = 50;

                for (var _n = 0; _n < boxNumber; _n++) {
                    canvas.drawRoundRect(new RectF(location, 15, location += boxScale * 25, 515), 7, 7, paint);
                    location += boxScale * 7;
                    health -= 25;
                }

                canvas.drawRoundRect(new RectF(location, 15, location + boxScale * health, 515), 7, 7, paint);

                return bitmap;
            } catch (error) {
                console.error(error, '\nERROR LINE >> ' + error.lineNumber);
            }
        }
    }]);

    return UI;
}();

/* ----------------------------------------------------------- */

function followRow(x, y, z) {
    x += 0.5;
    y += 0.5;
    z += 0.5;

    var a = Player.getX();
    var b = Player.getY();
    var c = Player.getZ();

    x = x - a;
    y = y - b;
    z = z - c;
    var l = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));

    var sinHorizontal = x / l;
    var cosHorizontal = z / l;
    var tanHorizontal = x / z;
    var acosHorizontal = Math.acos(z / l) * 180 / Math.PI;

    var atanVertical = Math.atan(y / l);

    var alpha = 0;

    if (sinHorizontal > 0 && cosHorizontal > 0 && tanHorizontal > 0) alpha = 360 - acosHorizontal;else if (sinHorizontal > 0 && cosHorizontal < 0 && tanHorizontal < 0) alpha = 360 - acosHorizontal;else if (sinHorizontal < 0 && cosHorizontal < 0 && tanHorizontal > 0) alpha = acosHorizontal;else if (sinHorizontal < 0 && cosHorizontal > 0 && tanHorizontal < 0) alpha = acosHorizontal;else if (cosHorizontal == 1) alpha = 0;else if (sinHorizontal == 1) alpha = 90;else if (cosHorizontal == -1) alpha = 180;else if (sinHorizontal == -1) alpha = 270;else if (sinHorizontal == 0 && cosHorizontal == 1 && tanHorizontal == 0) null;

    var beta = atanVertical;
    beta = -1 * beta * 180 / Math.PI;

    Entity.setRot(Player.getEntity(), alpha, beta);
}

var players = [];
var myInfo = null;

var health = 200;
var CHealth = 200;

var damage = 100;

var windows = [];

function makeProfile(hero) {
    context.runOnUiThread(new Runnable(this.run = function () {
        try {
            windows[0] = new PopupWindow();
            var layout = new RelativeLayout(context);

            var picture = new Button(context);

            picture.setWidth(dipToPixel(100));
            picture.setHeight(dipToPixel(100));

            picture.setBackgroundDrawable(new BitmapDrawable(UI.profile(hero)));

            layout.addView(picture);
            windows[0].setContentView(layout);

            windows[0].setWidth(dipToPixel(100));
            windows[0].setHeight(dipToPixel(100));

            windows[0].setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

            winodws[0].showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 10, 10);
        } catch (error) {
            console.error(error, '\nERROR LINE >> ' + error.lineNumber);
        }
    }));
}

var healthBar = void 0;

function makeHealthBar() {
    context.runOnUiThread(new Runnable(this.run = function () {
        try {
            windows[1] = new PopupWindow();
            var layout = new RelativeLayout(context);

            healthBar = new Button(context);

            healthBar.setWidth(dipToPixel(240));
            healthBar.setHeight(dipToPixel(15));

            healthBar.setBackgroundDrawable(new BitmapDrawable(ui.healthBar(CHealth, health)));

            layout.addView(healthBar);
            windows[1].setContentView(layout);

            windows[1].setWidth(dipToPixel(240));
            windows[1].setHeight(dipToPixel(240));

            windows[1].setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

            windows[1].setTouchable(false);

            windows[1].showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 100, 200);
        } catch (error) {
            console.error(error, '\nERROR LINE >> ' + error.lineNumber);
        }
    }));
}

function drawHealthBar() {
    context.runOnUiThread(new Runnable(this.run = function () {
        try {
            healthBar.setBackgroundDrawable(new BitmapDrawable(UI.healthBar(CHealth, health)));
        } catch (error) {
            console.error(error, '\nERROR LINE >> ' + error.lineNumber);
        }
    }));
}

var cooltime = 0;
var murder = null;

function InterpretData(data) {
    if (data.indexOf('Spawn Player') !== -1) {
        data = data.split(': ');

        var info = void 0;

        if (myInfo === null) info = myInfo = {
            id: Level.spawnMob(0, 5, 0, EntityType.VILLAGER),
            name: data[1],

            x: 0,
            y: 5,
            z: 0,

            yaw: 0,
            pitch: 0
        };else info = {
            id: Level.spawnMob(0, 5, 0, EntityType.VILLAGER),
            name: data[1],

            x: 0,
            y: 5,
            z: 0,

            yaw: 0,
            pitch: 0
        };

        Entity.remove(myInfo.id);

        players.push(info);

        return true;
    } else if (data.indexOf('Move Player') !== -1) {
        data = data.split(': ');

        var player = players.find(function (obj) {
            return obj.name === data[1];
        });

        player.x = parseFloat(data[2]);
        player.y = parseFloat(data[3]);
        player.z = parseFloat(data[4]);

        player.yaw = parseFloat(data[5]);
        player.pitch = parseFloat(data[6]);

        return true;
    } else if (data.indexOf('Destroy Block') !== -1) {
        data = data.split(': ');

        Level.destroyBlock(data[1], data[2], data[3], false);

        return true;
    } else if (data.indexOf('Attack Player') !== -1) {
        data = data.split(': ');

        if (data[1] === myInfo.name) {
            if (health >= 0) {
                health -= data[2];
                drawHealthBar();
            } else {
                murder = players.find(function (obj) {
                    return obj.name === data[1];
                });

                console.log(murder.name);
            }
        }
    } else {
        try {
            eval(data);
        } catch (error) {
            eval('clientMessage(\'' + data + '\');');
        }
    }
}

var nickname = Math.random() + '';

var socket = void 0;

var input = void 0,
    output = void 0;
var data = void 0;

var IOClient = function () {
    console.log('Your Nickname: ' + nickname);

    new Thread(this.run = function () {
        try {
            var ip = '192.168.35.212';
            socket = new Socket(ip, 7000);

            console.log('Trying to Joined to Server.');

            //nickname = Player.getName(Player.getEntity() );

            input = new DataInputStream(socket.getInputStream());
            output = new DataOutputStream(socket.getOutputStream());

            output.writeUTF(nickname);
            output.writeUTF('Spawn Player: ' + nickname);
        } catch (error) {
            console.error(error, '\nERROR LINE >> ' + error.lineNumber);
        }
    }).start();
    

    this.sender = function sender() {
        return new Thread(this.run = function () {
            while (output !== null) {
                try {
                    if (data !== null) {
                        output.writeUTF(data + '');
                        data = null;
                    }
                } catch (error) {}
            }
        });
    }
    this.receiver = function receiver() {
        return new Thread(this.run = function () {
            try {
                while (input !== null) {
                    try {
                        InterpretData(input.readUTF() + '');
                    } catch (error) {}
                }
            } catch (error) {
                console.error(error, '\nERROR LINE >> ' + error.lineNumber);
            }
        });
    }
};

/* ----------------------------------------------------------- */

var client = void 0;

function newLevel(hasLevel) {
    Level.executeCommand('/kill @e', true);

    client = new IOClient();

    client.sender().start();
    client.receiver().start();

    new Thread(this.run = function () {
        while (true) {
            for (var _index = 0; _index < players.length; _index++) {
                try {
                    Thread.sleep(5);

                    Entity.setRot(players[_index].id, players[_index].yaw, players[_index].pitch);
                } catch (error) {}
            }
        }
    }).start();

    makeProfile();
    makeHealthBar();
}

function attackHook(attacker, victim) {
    var player = void 0;

    if ((player = players.find(function (object) {
        return object.id + '' === victim + '';
    })) !== undefined) {
        if (cooltime === 0) data = 'Attack Player: ' + player.name + ': ' + damage;
    }
}

function leaveGame() {
    new Thread(this.run = function () {
        socket.close();
    }).start();

    context.runOnUiThread(new Runnable(this.run = function () {
        windows[0].dismiss();
        windows[1].dismiss();
    }));
}

function modTick() {
    for (var _index2 = 0; _index2 < players.length; _index2++) {
        Entity.setVelX(players[_index2].id, players[_index2].x - Entity.getX(players[_index2].id));
        Entity.setVelY(players[_index2].id, players[_index2].y - 1.5 - Entity.getY(players[_index2].id));
        Entity.setVelZ(players[_index2].id, players[_index2].z - Entity.getZ(players[_index2].id));
    }

    if (health <= 0) {
        if (cooltime === 0) cooltime = 5 * 20;
    }

    if (cooltime === 0) {
        data = 'Move Player: ' + nickname + ': ' + Player.getX() + ': ' + Player.getY() + ': ' + Player.getZ() + ': ' + Entity.getYaw(Player.getEntity()) + ': ' + Entity.getPitch(Player.getEntity());

        if (health === 1) {
            health = CHealth;
            drawHealthBar();

            murder = null;
        }
    } else {
        --cooltime;

        Entity.setVelX(Player.getEntity(), players[index].x - Entity.getX(Player.getEntity()));
        Entity.setVelY(Player.getEntity(), players[index].y - 1.5 - Entity.getY(Player.getEntity()));
        Entity.setVelZ(Player.getEntity(), players[index].z - Entity.getZ(Player.getEntity()));

        if (murder !== null) {
            followRow(murder.x, murder.y, murder.z);
        }
    }
}