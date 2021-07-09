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
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog title="预览" :visible="showDialog" @close="showDialog = false">
      <el-row type="flex" justify="center">
        <img :src="previewUrl">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          url: 'https://img0.baidu.com/it/u=2164845441,520462980&fm=26&fmt=auto&gp=0.jpg'
        }
      ],
      showDialog: false,
      previewUrl: ''
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
    upload() {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep img{
  object-fit: contain;
}
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
