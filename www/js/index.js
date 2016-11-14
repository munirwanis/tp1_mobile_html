var app = {
    // Application Constructor
    initialize: function () {
        //variaveis iniciais
        app.watch = 0;
        app.cnv = 0;
        app.target = 0;
        app.xPos = 0;
        app.yPos = 0;
        app.campo = document.getElementById("campo");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.onOnline, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        app.getDeviceInfo(); // Pega informações do dispositivo usando o plugin device
        app.getConnectionInfo(); // Pega informações de conexão do plugin network-information
        app.watch = navigator.accelerometer.watchAcceleration(app.successAcc,
            app.failureAcc, {
                frequency: 25
            });
    },
    successAcc: function (accel) {
        //abaixo um codigo para ficar visual
        //um círculo que vai se mexer conforme mexem o celular
        //Os valores de aceleração em x e y afetam quão rápido a bolinha responde.
        var marginLeft = accel.x * 30 - 10;
        var marginTop = accel.y * 30 - 10;
        app.campo.innerHTML = "<div class='blocodancante' style='margin-left: " + marginLeft +
            "px; margin-top:" + marginTop + "px;'></div>";

        document.getElementById("xOut").innerHTML = accel.x;
        document.getElementById("yOut").innerHTML = accel.y;
        document.getElementById("zOut").innerHTML = accel.z;
    },
    failureAcc: function () {
        console.log('deu ruim');
    },
    onPause: function () {
        //como limpar a monitoria do acelerometro
        navigator.accelerometer.clearWatch(app.watch);
    },
    onResume: function () {
        //aqui, ao voltar a app, volta a verificar o acelerometro
        app.watch = navigator.accelerometer.watchAcceleration(app.successAcc,
            app.failureAcc, {
                frequency: 25
            });
    },
    // Função onOnline que exibe a informação positiva na div#mensagem
    onOnline: function () {
        document.getElementById("isConn").innerHTML = "Sim";
    },
    // Função onOffline que exibe a informação negativa na div#mensagem
    onOffline: function () {
        document.getElementById("isConn").innerHTML = "Não";
    },
    // Função getDeviceInfo que exibe as informações do dispositivo na div#mensagem
    // Atenção a aberturas e fechamentos de código HTML e à necessidade do sinal + entre os pedaços de informação
    // Repare também que só tem um ; ao fim do bloco de informação.
    getDeviceInfo: function () {
        document.getElementById("cordova").innerHTML = device.cordova;
        document.getElementById("plataforma").innerHTML = device.platform;
        document.getElementById("uuid").innerHTML = device.uuid;
        document.getElementById("version").innerHTML = device.version;
    },
    // Função onOffline que exibe as informações de conexão na div#mensagem
    // Atenção aos ; no fim de cada linha. Aqui não é um só bloco de informação como em getDeviceInfo
    getConnectionInfo: function () {
        // Vamos definir a variável networkstate e acessar o objeto "navigator" para ver o tipo de conexão
        var networkstate = navigator.connection.type;
        // Como pode ser recebida qualquer uma de várias respostas, vamos criar um array de resultados possíveis
        // previstos na API. Cada item do array corresponderá a um ID de resultado do Cordova que precisa ser 
        // associado a um texto compreensível pelo usuário.
        var states = {};
        states[Connection.UNKNOWN] = 'Desconhecida';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI] = 'WiFi';
        states[Connection.CELL_2G] = '2G';
        states[Connection.CELL_3G] = '3G';
        states[Connection.CELL_4G] = '4G';
        states[Connection.CELL] = 'Outra rede celular';
        states[Connection.NONE] = 'Sem rede';
        // Agora dzemos para exibir na div#mensagem o item do array recebido
        document.getElementById("connType").innerHTML = states[networkstate];
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        window.addEventListener("batterystatus", onBatteryStatus, false);

        function onBatteryStatus(status) {
            document.getElementById("level").innerHTML = status.level + "%";
            document.getElementById("isPlugged").innerHTML = status.isPlugged ? "Sim" : "Não";
        }
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};