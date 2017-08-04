/**
 * Created by tianhao on 2017/8/3.
 */


var $record = $('#record');
var $recordingList = $('#recording-list');
var $timeDisplay = $('#time-display');
var $dateTime = $('#date-time');
var $cancel = $('#cancel');
var startTime = null;
var encodingProcess = 'direct',
    encoder = undefined;
<<<<<<< HEAD
//兼容
window.URL = window.URL || window.webkitURL;
navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
=======
 //兼容
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var audioContext = new AudioContext;
>>>>>>> 8ec703cd0d9cb8bd0bef92ca5eca00e27dd9beef
if (audioContext.createScriptProcessor == null)
    audioContext.createScriptProcessor = audioContext.createJavaScriptNode;
var processor = undefined;
var input = audioContext.createGain();
var mixer = audioContext.createGain();
var microphone = undefined;
var microphoneLevel = audioContext.createGain();
    microphoneLevel.gain.value = 60;
    microphoneLevel.connect(mixer);
    mixer.connect(input);
    mixer.connect(audioContext.destination);


/*
 * 获取麦克风设备
 * */

function openMicrophone () {
<<<<<<< HEAD
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: open,})
            .then(function (mediaStream) {
                microphone = audioContext.createMediaStreamSource(mediaStream);
                microphone.connect(microphoneLevel);
            })
            .catch(function (error) {
                console.log('no microphone input device');
            })
    } else {
        console.log('getUserMedia not support on your browser!');
    }
=======
    navigator.getUserMedia({ audio: true },
        function(stream) {
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(microphoneLevel);
        },
        function(error) {
            window.alert("Could not get audio input.");
        });
/*    navigator.mediaDevices.getUserMedia({ audio: open,})
        .then(function(mediaStream) {
            microphone = audioContext.createMediaStreamSource(mediaStream);
            microphone.connect(microphoneLevel);
        })
        .catch(function(error) {
        })*/
>>>>>>> 8ec703cd0d9cb8bd0bef92ca5eca00e27dd9beef
}



/*
* 监听语音时间
* */
function minSecStr(n) { return (n < 10 ? "0" : "") + n; }
function updateDateTime() {
    if (startTime != null) {
        var sec = Math.floor((Date.now() - startTime) / 1000);
        $timeDisplay.html(minSecStr(sec / 60 | 0) + ":" + minSecStr(sec % 60));
    }
}

window.setInterval(updateDateTime, 200);

/*
* 保存语音
* */
function saveRecording(blob) {
    var time = new Date(),
        url = URL.createObjectURL(blob),
        html = "<p recording='" + url + "'>" +
            "<audio controls src='" + url + "'></audio> " +
            time +
            " <a class='btn btn-default' href='" + url +
            "' download='recording.mp3'>" +
            "Save...</a> "
    $recordingList.prepend($(html));
}

/*
* 获取数据流
* */
function getBuffers(event) {
    var buffers = [];
    for (var ch = 0; ch < 2; ++ch)
        buffers[ch] = event.inputBuffer.getChannelData(ch);
    return buffers;
}

/*
* 启动录音进程
* */
function startRecordingProcess() {
    var bufSz = 2048,
        bitRate = 160;
    processor = audioContext.createScriptProcessor(bufSz, 2, 2);
    input.connect(processor);
    processor.connect(audioContext.destination);
    if (encodingProcess === 'direct') {
        encoder = new Mp3LameEncoder(audioContext.sampleRate, bitRate);
        processor.onaudioprocess = function(event) {
            encoder.encode(getBuffers(event));
        };
    }
}

/*
* 停止录音进程
* */
function stopRecordingProcess(finish) {
    input.disconnect();
    processor.disconnect();
    if (encodingProcess === 'direct') {
        if (finish) {
            saveRecording(encoder.finish());
        }
        else {
            encoder.cancel();
        }
    }
}

/*
* 停止录音事件
* */
function stopRecording(finish) {
    startTime = null;
    $timeDisplay.html('00:00');
    $record.html('RECORD');
    $cancel.addClass('hidden');
    stopRecordingProcess(finish);
    microphone.disconnect();
}

/*
* 开始录音事件
* */
function startRecording() {
    startTime = Date.now();
    $record.html('STOP');
    $cancel.removeClass('hidden');
    startRecordingProcess();
}

/*
* 点击record事件
* */
$record.click(function() {
    if (startTime != null) {
        stopRecording(true);
<<<<<<< HEAD
=======
        console.log('yes');
>>>>>>> 8ec703cd0d9cb8bd0bef92ca5eca00e27dd9beef
    }
    else {
        openMicrophone();
        startRecording();
    }

});

$cancel.click(function() {
    stopRecording(false);
});
