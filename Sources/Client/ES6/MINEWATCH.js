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
const Thread = java.lang.Thread,
    Runnable = java.lang.Runnable;

// IMPORT java.net.*
const ServerSocket = java.net.ServerSocket,
    Socket = java.net.Socket,
    DatagramSocket = java.net.DatagramSocket,
    DatagramPacket = java.net.DatagramSocket,
    InetAddress = java.net.InetAddress;


// IMPORT java.io.*;
const DataInputStream = java.io.DataInputStream,
    DataOutputStream = java.io.DataOutputStream;

// IMPORT android.widget.*
const PopupWindow = android.widget.PopupWindow,
    RelativeLayout = android.widget.RelativeLayout,
    LayoutParams = RelativeLayout.LayoutParams,
    LinearLayout = android.widget.LinearLayout,
    Button = android.widget.Button,
    TextView = android.widget.TextView,
    Toast = android.widget.Toast;

// IMPORT android.graphics.*
const Color = android.graphics.Color,
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
const OnClickListener = android.view.View.OnClickListener,
    OnLongClickListener = android.view.View.OnLongClickListener,
    OnTouchListener = android.view.View.OnTouchListener,
    Gravity = android.view.Gravity,
    MotionEvent = android.view.MotionEvent;

// IMPORT android.context.*
const ColorStateList = android.content.res.ColorStateList;

// GET CONTEXT & SDCARD'S PATH
const context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

// CHANGE DIP TO PIXEL
const dipToPixel = dips =>
    dips * context.getResources().getDisplayMetrics().density;

// GET SCREEN'S SIZE
const Screen = {
    width: context.getWindowManager().getDefaultDisplay().getWidth(),
    height: context.getWindowManager().getDefaultDisplay().getHeight()
};

// GET HARDWARE'S INFORMATION
const information = com.mojang.minecraftpe.HardwareInformation;
information.initHardwareInformation();

const androidVersion = information.getAndroidVersion();
/* ----------------------------------------------------------- */

function toast(red, green, blue, texts) {
    context.runOnUiThread(
        new Runnable(
            this.run = function() {
                try {
                    const border = new GradientDrawable();
                    border.setColor(Color.argb(100, red, green, blue) );
                    border.setStroke(2, Color.WHITE);

                    const view = new TextView(context);
                    view.setBackgroundDrawable(border);
                    view.setPadding(dipToPixel(5), dipToPixel(5), dipToPixel(5), dipToPixel(5) );

                    view.setGravity(Gravity.CENTER);
                    view.setTextColor(Color.WHITE);
                    view.setTextSize(15);
                    view.setText(texts.join(' ') );

                    const toast = new Toast(context);
                    toast.setView(view);
                    toast.setDuration(Toast.LENGTH_LONG);
                    toast.show();
                } catch(error) {
                    let toast = new Toast.makeText(context, error.message, Toast.LENGTH_LONG).show();
                }
            }
        )
    );
}


const console = {
    log(...texts) {
        toast(0, 0, 0, texts);
    },

    error(...texts) {
        toast(255, 0, 0, texts);
    }
};

console.log(androidVersion);

/* ----------------------------------------------------------- */

class UI {
    static profile(hero) {
        try {
            const bitmap = new Bitmap.createBitmap(200, 200, Bitmap.Config.ARGB_8888);
            const canvas = new Canvas(bitmap);
            const paint = new Paint();

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
        } catch(error) {
            console.error(error, `\nERROR LINE >> ${error.lineNumber}`);
        }
    }

    static healthBar(constHealth, health) {
        try {
            const bitmap = new Bitmap.createBitmap(2000, 2000, Bitmap.Config.ARGB_8888);
            const canvas = new Canvas(bitmap);
            const paint = new Paint();

            paint.setAntiAlias(true);
            paint.setStrokeCap(Paint.Cap.ROUND);
            paint.setStyle(Paint.Style.FILL_AND_STROKE);
            paint.setStrokeWidth(15.0);
            
            let constBoxNumber = Math.floor(constHealth / 25);
            let boxNumber = Math.floor(health / 25);
            let location = 15;

            const boxScale = 1000 / constHealth;

            canvas.rotate(355);
            canvas.skew(10, 0);

            if(constHealth === 0) {
                paint.setARGB(150, 150, 150, 150);

                for(let n = 0; n < constBoxNumber; n++) {
                    canvas.drawRoundRect(new RectF(location, 15, location += boxScale * 25, 515), 5, 5, paint);
                    location += boxScale * 5;
                    constHealth -= 25;
                }
    
                canvas.drawRect(new RectF(location, 15, location + (boxScale * constHealth), 515), 5, 5, paint);
            }

            paint.setARGB(255, 255, 255, 255);

            location = 15;

            for(let n = 0; n < boxNumber; n++) {
                canvas.drawRect(new RectF(location, 15, location += boxScale * 25, 515), 5, 5, paint);
                location += boxScale * 5;
                health -= 25;
            }

            canvas.drawRect(new RectF(location, 15, location + (boxScale * health), 515), 5, 5, paint);
            
            return bitmap;
        } catch(error) {
            console.error(error, `\nERROR LINE >> ${error.lineNumber}`);
        }
    }
}

/* ----------------------------------------------------------- */

const players = [];
let myInfo;

let health = 200;
const CHealth = 200;

let damage = 100;

let BHealth = CHealth;

const windows = [];

function makeProfile(hero) {
    context.runOnUiThread(
        new Runnable(
            this.run = function() {
                try {
                    const window = (windows[0] = new PopupWindow() );
                    const layout = new RelativeLayout(context);

                    const picture = new Button(context);

                    picture.setWidth(dipToPixel(100) );
                    picture.setHeight(dipToPixel(100) );

                    picture.setBackgroundDrawable(
                        new BitmapDrawable(UI.profile(hero) )
                    );

                    layout.addView(picture);
                    window.setContentView(layout);

                    window.setWidth(dipToPixel(100) );
                    window.setHeight(dipToPixel(100) );

                    window.setBackgroundDrawable(
                        new ColorDrawable(Color.TRANSPARENT)
                    );

                    winodw.showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 10, 10);
                } catch(error) {
                    console.error(error, '\nERROR LINE >> ' + error.lineNumber);
                }
            }
        )
    );
}

function makeHealthBar() {
    context.runOnUiThread(
        new Runnable(
            this.run = function() {
                try {
                    const window = (windows[1] = new PopupWindow() );
                    const layout = new RelativeLayout(context);

                    const picture = new Button(context);

                    picture.setWidth(dipToPixel(200) );
                    picture.setHeight(dipToPixel(200) );

                    picture.setBackgroundDrawable(
                        new BitmapDrawable(UI.healthBar(CHealth, health) )
                    );

                    layout.addView(picture);
                    window.setContentView(layout);

                    window.setWidth(dipToPixel(100) );
                    window.setHeight(dipToPixel(100) );

                    window.setBackgroundDrawable(
                        new ColorDrawable(Color.TRANSPARENT)
                    );

                    winodw.showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 10, 50);
                } catch(error) {
                    console.error(error, '\nERROR LINE >> ' + error.lineNumber);
                }
            }
        )
    );
}

function InterpretData(data) {
    if(data.indexOf('Spawn Player') !== -1) {
        data = data.split(': ');
        
        myInfo = {
            id: Level.spawnMob(0, 5, 0, EntityType.VILLAGER),
            name: data[1],

            x: 0,
            y: 5,
            z: 0,

            yaw: 0,
            pitch: 0
        };
        
        players.push(myInfo);

        return true;
    } else if(data.indexOf('Move Player') !== -1) {
        data = data.split(': ');

        let player = players.find(obj => obj.name === data[1] );

        player.x = parseFloat(data[2] );
        player.y = parseFloat(data[3] );
        player.z = parseFloat(data[4] );

        player.yaw = parseFloat(data[5] );
        player.pitch = parseFloat(data[6] );

        return true;
    } else if(data.indexOf('Destroy Block') !== -1) {
        data = data.split(': ');

        Level.destroyBlock(data[1], data[2], data[3], false);

        return true;
    } else if(data.indexOf('Attack Player') !== -1) {
        data = data.split(': ');

        if (data[1] === myInfo.name) {
            health -= data[2];
        }
    } else {
        try {
            eval(data);
        } catch(error) {
            eval(`clientMessage('${data}');`);
        }
    }
}

let nickname = Math.random() + '';

let socket;

let input, output;
let data;

class IOClient {
    constructor() {
        console.log('Your Nickname: ' + nickname);

        new Thread(
            this.run = function() {
                try {
                    const ip = '192.168.35.212';
                    socket = new Socket(ip, 7000);
        
                    console.log('Trying to Joined to Server.');
        
                    //nickname = Player.getName(Player.getEntity() );
        
                    input = new DataInputStream(socket.getInputStream() );
                    output = new DataOutputStream(socket.getOutputStream() );
            
                    output.writeUTF(nickname);
                    output.writeUTF('Spawn Player: ' + nickname);
                } catch(error) {
                    console.error(error, `\nERROR LINE >> ${error.lineNumber}`);
                }
            }
        ).start();
    }

    static sender() {
        return new Thread(
            this.run = function() {
                while(output !== null) {
                    try {
                        if(data !== null) {
                            output.writeUTF(data + '');
                            data = null;
                        }
                    } catch(error) { }
                }
            }
        );
    }

    static receiver() {
        return new Thread(
            this.run = function() {
                try {
                    while(input !== null) {
                        try {
                            InterpretData(input.readUTF() + '');
                        } catch(error) { }
                    }
                } catch(error) {
                    console.error(error, `\nERROR LINE >> ${error.lineNumber}`);
                }
            }
        );
    }
}

/* ----------------------------------------------------------- */

let client;
let sender, receiver;

function newLevel(hasLevel) {
    client = new IOClient();

    sender = client.sender().start();
    receiver = client.receiver().start();

    new Thread(
        this.run = function() {
            while(true) {
                for(let index = 0; index < players.length; index++) {
                    try{
                        Thread.sleep(5);
    
                        Entity.setRot(players[index].id, players[index].yaw, players[index].pitch);
                    } catch(error) { }
                }
            }
        }
    ).start();

    makeProfile();
    makeHealthBar();
}

function attackHook(attacker, victim) {
    let player;

    if( (player = players.find(object => object.id + '' === victim + '') ) !== undefined) {
        data = `Attack Player: ${player.name}: ${damage}`;
    }
}

function leaveGame() {
    new Thread(
        this.run = function() {
            socket.close();
        }
    ).start();

    windows[0].dismiss();
    windows[1].dismiss();
}

function modTick() {
    if(health > 0) {
        if(BHealth !== health) {
            makeHealthBar();
            BHealth = health;
        }
    }

    for(let index = 0; index < players.length; index++) {
        Entity.setVelX(players[index].id, players[index].x - Entity.getX(players[index].id) );
        Entity.setVelY(players[index].id, (players[index].y - 2) - Entity.getY(players[index].id) );
        Entity.setVelZ(players[index].id, players[index].z - Entity.getZ(players[index].id) );
    }
    
    data = `Move Player: ${nickname}: ${Player.getX() }: ${Player.getY() }: ${Player.getZ() }: ${Entity.getYaw(Player.getEntity() ) }: ${Entity.getPitch(Player.getEntity() ) }`;
}