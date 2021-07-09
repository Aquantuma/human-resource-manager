<template>
  <div>
    <!--
        action 必填，指定上传地址
        list-type 指定显示方式
        file-list 文件数组
        list-type 指定显示方式
        class 添加动态类名，已有图片则隐藏上传按钮
        on-preview 指定点击已上传图片的处理方式，绑定后会多一个放大镜
        on-remove 删除图片后的钩子，替换最新的文件列表
        on-change 变更图片后的钩子，替换最新的文件列表
        http-request 覆盖默认上传行为
    -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="preview"
      :class="{ disable: fileList.length > 0 }"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showProgress"
      :show-text="false"
      :stroke-width="8"
      :percentage="percentage"
      style="width: 148px"
    />

    <el-dialog title="预览" :visible="showDialog" @close="showDialog = false">
      <el-row type="flex" justify="center">
        <img :src="previewUrl">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDISYhnleQ8kJl6NYbcWJyVvDNQL9pOuIX',
  SecretKey: 'FNNEzdBjATiolYBh7PYXODwY2PfnneNy'
})
export default {
  data() {
    return {
      fileList: [
        // {
        //   url: 'https://img0.baidu.com/it/u=2164845441,520462980&fm=26&fmt=auto&gp=0.jpg'
        // }
      ],
      showDialog: false,
      previewUrl: '',
      showProgress: false,
      percentage: 0
    }
  },
  methods: {
    preview(file) {
      console.log(file)
      this.previewUrl = file.url
      this.showDialog = true
    },
    onRemove(file, newFileList) {
      this.fileList = [...newFileList]
    },
    onChange(file, newFileList) {
      this.fileList = [...newFileList]
    },
    beforeUpload(file) {
      // console.log(file)
      const types = ['image/jpeg', 'image/png', 'image/gif']
      const maxSize = 2 * 1024 * 1024
      // 拦截格式
      if (!types.includes(file.type)) {
        this.$message.error('不支持的文件类型')
        return false
      }
      // 拦截大小
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2M')
        return false
      }
    },
    upload(params) {
      console.log(params)
      // 显示进度条
      this.showProgress = true
      cos.putObject(
        {
          // 存储桶的名称，必须字段
          Bucket: 'human-resource-1306481102',
          // 存储桶的地域，必须字段
          Region: 'ap-guangzhou',
          // 对象在存储桶中的唯一标识，必须字段，可以是文件名
          Key: params.file.name,
          // 设置对象的存储类型，默认为STANDARD
          StorageClass: 'STANDARD',
          // 上传文件的内容
          Body: params.file,
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData))
            this.percentage = progressData.percent * 100
          }
        },
        (err, data) => {
          console.log(err || data)
          if (!err) {
            // 用这个异步上传完毕的地址，替换fileList当中的url
            this.fileList[0].url = 'https://' + data.Location
            // 显示上传成功的角标
            this.fileList[0].status = 'success'
          }
          // 延迟500毫秒关闭进度条
          setTimeout(() => {
            this.showProgress = false
          }, 500)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep img {
  object-fit: contain;
}
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
