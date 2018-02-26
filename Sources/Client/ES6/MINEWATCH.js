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
            const bitmap = new Bitmap.createBitmap(2000, 2000, Bitmap.Config.ARGB_8888);
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
            const bitmap = new Bitmap.createBitmap(2000, 600, Bitmap.Config.ARGB_8888);
            const canvas = new Canvas(bitmap);
            const paint = new Paint();

            paint.setAntiAlias(true);
            paint.setStrokeCap(Paint.Cap.ROUND);
            paint.setStyle(Paint.Style.FILL_AND_STROKE);
            paint.setStrokeWidth(15.0);
            
            let constBoxNumber = Math.floor(constHealth / 25);
            let boxNumber = Math.floor(health / 25);
            let location = 50;

            const boxScale = 1000 / constHealth;

            canvas.rotate(355);
            canvas.skew(-0.15, 0);

            paint.setARGB(150, 150, 150, 150);

            for(let n = 0; n < constBoxNumber; n++) {
                canvas.drawRoundRect(new RectF(location, 15, location += boxScale * 25, 515), 7, 7, paint);
                location += boxScale * 7;
                constHealth -= 25;
            }
    
            canvas.drawRoundRect(new RectF(location, 15, location + (boxScale * constHealth), 515), 7, 7, paint);
            

            paint.setARGB(255, 255, 255, 255);

            location = 50;

            for(let n = 0; n < boxNumber; n++) {
                canvas.drawRoundRect(new RectF(location, 15, location += boxScale * 25, 515), 7, 7, paint);
                location += boxScale * 7;
                health -= 25;
            }

            canvas.drawRoundRect(new RectF(location, 15, location + (boxScale * health), 515), 7, 7, paint);
            
            return bitmap;
        } catch(error) {
            console.error(error, `\nERROR LINE >> ${error.lineNumber}`);
        }
    }
}

/* ----------------------------------------------------------- */

function followRow(x, y, z) {
    x += 0.5;
    y += 0.5;
    z += 0.5;
    
    var a = Player.getX();
    var b = Player.getY();
    var c = Player.getZ();
    
    x = x-a;
    y = y-b;
    z = z-c;
    var l = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2) );
    
    var sinHorizontal = x / l;
    var cosHorizontal = z / l;
    var tanHorizontal = x / z;
    var acosHorizontal = Math.acos(z/l) * 180 / Math.PI;
    
    var atanVertical = Math.atan(y / l);
    
    var alpha = 0;
    
    if(sinHorizontal > 0 && cosHorizontal > 0 && tanHorizontal > 0) alpha = 360 - acosHorizontal;
    else if(sinHorizontal > 0 && cosHorizontal < 0 && tanHorizontal < 0) alpha = 360 - acosHorizontal;
    else if(sinHorizontal < 0 && cosHorizontal < 0 && tanHorizontal > 0) alpha = acosHorizontal;
    else if(sinHorizontal < 0 && cosHorizontal > 0 && tanHorizontal < 0) alpha = acosHorizontal;
    else if(cosHorizontal == 1) alpha = 0;
    else if(sinHorizontal == 1) alpha = 90;
    else if(cosHorizontal == -1) alpha = 180;
    else if(sinHorizontal == -1) alpha = 270;
    else if(sinHorizontal == 0 && cosHorizontal == 1 && tanHorizontal == 0) null;
    
    var beta = atanVertical;
    beta = -1 * beta * 180 / Math.PI;
    
    Entity.setRot(Player.getEntity(), alpha, beta);
}
    
    

const players = [];
let myInfo = null;

let health = 200;
const CHealth = 200;

let damage = 100;

const windows = [];

function makeProfile(hero) {
    context.runOnUiThread(
        new Runnable(
            this.run = function() {
                try {
                    windows[0] = new PopupWindow();
                    const layout = new RelativeLayout(context);

                    const picture = new Button(context);

                    picture.setWidth(dipToPixel(100) );
                    picture.setHeight(dipToPixel(100) );

                    picture.setBackgroundDrawable(
                        new BitmapDrawable(UI.profile(hero) )
                    );

                    layout.addView(picture);
                    windows[0].setContentView(layout);

                    windows[0].setWidth(dipToPixel(100) );
                    windows[0].setHeight(dipToPixel(100) );

                    windows[0].setBackgroundDrawable(
                        new ColorDrawable(Color.TRANSPARENT)
                    );

                    winodws[0].showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 10, 10);
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
                    windows[1] = new PopupWindow();
                    const layout = new RelativeLayout(context);

                    const picture = new Button(context);

                    picture.setWidth(dipToPixel(240));
                    picture.setHeight(dipToPixel(15));

                    picture.setBackgroundDrawable(new BitmapDrawable(ui.healthBar(CHealth, health)));

                    layout.addView(picture);
                    windows[1].setContentView(layout);

                    windows[1].setWidth(dipToPixel(240) );
                    windows[1].setHeight(dipToPixel(240) );

                    windows[1].setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));


                    windows[1].setTouchable(false);

                    windows[1].showAtLocation(context.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 100, 200);
                } catch(error) {
                    console.error(error, '\nERROR LINE >> ' + error.lineNumber);
                }
            }
        )
    );
}

let cooltime = 0;
let murder = null;

function InterpretData(data) {
    if(data.indexOf('Spawn Player') !== -1) {
        data = data.split(': ');

        let info;
        
        if(myInfo === null)
            info = (myInfo = {
                id: Level.spawnMob(0, 5, 0, EntityType.VILLAGER),
                name: data[1],

                x: 0,
                y: 5,
                z: 0,

                yaw: 0,
                pitch: 0
            } );
        else
            info = {
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
            if(health >= 0) {
                health -= data[2];
                makeHealthBar();   
            } else {
                murder = players.find(obj => obj.name === data[1] );
                
                console.log(murder.name);
            }
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

function newLevel(hasLevel) {
    Level.executeCommand('/kill @e', true);

    client = new IOClient();

    client.sender().start();
    client.receiver().start();

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
        if(cooltime === 0)
            data = `Attack Player: ${player.name}: ${damage}`;
    }
}

function leaveGame() {
    new Thread(
        this.run = function() {
            socket.close();
        }
    ).start();

    context.runOnUiThread(
        new Runnable(
            this.run = function() {
                windows[0].dismiss();
                windows[1].dismiss();   
            }
        )
    );
}

function modTick() {
    for(let index = 0; index < players.length; index++) {
        Entity.setVelX(players[index].id, players[index].x - Entity.getX(players[index].id) );
        Entity.setVelY(players[index].id, (players[index].y - 2) - Entity.getY(players[index].id) );
        Entity.setVelZ(players[index].id, players[index].z - Entity.getZ(players[index].id) );
    }
    
    if(health <= 0) {
        if(cooltime === 0)
            cooltime = 5 * 20;
    }
    
    if(cooltime === 0) {
        data = `Move Player: ${nickname}: ${Player.getX() }: ${Player.getY() }: ${Player.getZ() }: ${Entity.getYaw(Player.getEntity() ) }: ${Entity.getPitch(Player.getEntity() ) }`;

        if(health === 1)
            health = CHealth;

        murder = null;
    } else {
        --cooltime;
        if(murder !== null) {
            followRow(murder.x, murder.y, murder.z);
        }
    }
}