<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import {RtcEngine, kChannelServiceMedia, ChannelMode, AudioAecType} from '@pano.video/panortc-electron-sdk/js/panortc'
export default {
  data() {
    return {
      rtcEngine: null,
      channelParam: {
        appId: 'f9cefb8a59a54ae38588c59f7f5d081c',
        token: '01000006MWo5M0JWNUMGaF1as5wNytafr1DxRzUToDT9RrSaddaKaQG1SufX91QvKUYKa/37PyG8pkTDxCGw5JazPpwSiwwFU3zoy6NnxZiQPY083K5rSVk7KX1mJTVz9N5dL7T0mc9GXWeG8lUZN5VwOL5U0GIKauUOQ8ZjYbyQBBtt/23P2wPMH+dhl0H+6iJW+Hh8rxP6vjtCuAkfHLAiJrhnKGladyU07JyvYSq8/V14ZEy6YLL1DImiUxpNzWcEJ7VSNPTlI2kp7A8KNSG/LN61Tl6ASGSOZvpX',
        userId: 1,
        channelId: 50207,
        subscribeAudioAll: true
      }
    }
  },
  mounted() {
    // pano 加入会议相关 ---------------
    this.rtcEngine = new RtcEngine();
    console.log(this.rtcEngine)

    // 这个方法干哈的呀 ？！？！？
    this.rtcEngine.initialize(this.channelParam.appId, {
      panoServer: 'api.pano.video',
      videoHwAccel: false,
      audioAecType: AudioAecType.Default,
      audioScenario: 0
    });
    // this.joinChannel()
  },
  methods: {
    joinChannel() {
      // 以下是加入会议的 方法执行
      const serviceFlags = kChannelServiceMedia;
      console.log(this.channelParam)
      console.log(serviceFlags)
      console.log(ChannelMode.Mode_Meeting)
      const ret = this.rtcEngine.joinChannel(this.channelParam.token, this.channelParam.channelId, this.channelParam.userId, {
        channelMode: ChannelMode.Mode_Meeting,
        serviceFlags: serviceFlags,
        subscribeAudioAll: true, // subscribe user audio automatically
        userName: this.channelParam.userName
      });
      console.log(ret)
    }
  }

}
</script>
