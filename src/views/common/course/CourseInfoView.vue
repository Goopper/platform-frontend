<template>
  <main>
    <div class="course">
      <div class="title-type">
        <h1>{{ course.name }}</h1>
        <span>{{ course.type }}</span>
      </div>
      <p>授课老师 : {{ course.teacher }}</p>
      <div class="desc">
        <p>{{ course.desc }}</p>
        <v-img
          :src="course.cover"
          alt="课程图片"
        />
      </div>
    </div>
    <h2>课程附件 : </h2>
    <div class="attachments">
      <custom-attachment-card
        v-for="attachment in course.attachments"
        :key="attachment.id"
        :attachment="attachment"
      />
      <div
        v-if="course.attachments && course.attachments.length === 0"
        class="flex flex-col justify-center items-center"
      >
        <v-icon
          size="8vh"
          class="text-gray-400"
          icon="mdi-attachment"
        />
        <p class="font-bold text-lg text-gray-400">
          没有附件
        </p>
      </div>
    </div>
  </main>
</template>
<script>
import { getCourseInfo } from '@/api/course';
import CustomAttachmentCard from '@/components/CustomAttachmentCard.vue';
export default {
  name: 'CourseInfoView',
  components: { CustomAttachmentCard },
  data() {
    return {
      course: [],
      courseId: this.$route.params.id
    };
  },
  created() {
    this.getCourseInfo();
  },
  methods: {
    async getCourseInfo() {
      const res = await getCourseInfo(this.courseId);
      this.course = res.data;
    },
  },
};
</script>
<style lang="scss" scoped>
 main{
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2em;
 }
 .course{
  width: 100%;
  height: 50%;
  > p{
  padding: 2em 0;
  font-size: 0.75em;
  font-weight: bold;
 }
 }
 .title-type{
  display: flex;
  align-items: center;
  h1{
    font-size: 2em;
    font-weight: bold;
  }
  span{
    color: white;
    background-color: #383838;
    padding: 0.25em 0.75em;
    font-size: 0.75em;
    border-radius: 1em;
    margin-left: 0.5em;
  }
 }
 h2{
  font-weight: bold;

 }
 .desc{
  display: flex;
  justify-content: space-between;
  text-indent: 2em;
    height: 40%;
  p{
    width: 70%;
    overflow: auto;
  }
 }
 .attachments{
  overflow: auto;
  height: 50%;
  > *{
    margin: 1em 0;
  }
 }
 @media (max-width: 700px){
  main{
    padding: 1em;
  }
 }
</style>