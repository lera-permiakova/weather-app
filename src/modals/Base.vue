<template>
  <div class="modal-base" v-if="status">
    <div class="modal-base-body">
      <div class="modal-base-plate">
        <h2 class="modal-base-header"><slot name="title"/></h2>
        <p class="modal-base-description"><slot name="description"/></p>
      </div>
      <div class="modal-base-footer">
        <button class="modal-base-footer-button-cancel" v-if="!block" @click="$emit('onClose')"><slot name="button-cancel">Cancel</slot></button>
        <button class="modal-base-footer-button-accept" @click="$emit('onOk')"><slot name="button-accept">OK</slot></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalBase',
    props: {
      status: {
        type: Boolean,
        required: true
      },
      block: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({}),
    computed: {
    },
    methods: {
    }
  }
</script>

<style lang="css" scoped>
  .modal-base {
    display: flex;
    position: fixed;
    z-index: 18;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: rgba(151,164,176, .5);
  }
  .modal-base-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 340px;
    margin: auto;
    position: relative;
    box-sizing: border-box;
    background-color: #212A33;
    border-radius: 16px;
    /*padding: 48px 40px;*/
  }
  .modal-base-plate {
    padding: 48px 40px 0;
  }
  .modal-base-header {
    margin: 0 0 24px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #c7d5e7;
  }
  .modal-base-description {
    margin-bottom: 20px;
    text-align: center;
    font-size: 15px;
    line-height: 20px;
    color: #8296AA;
  }
  .modal-base-footer {
    padding: 0 16px 40px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
  }
  button {
    width: 100%;
    border-radius: 30px;
    padding: 16px 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    border: none;
    transition: .2s all ease-in-out;
  }
  .modal-base-footer-button-cancel {
    margin-right: 16px;
    background-color: #183651;
    color: #1890FF;
  }
  .modal-base-footer-button-cancel:hover {
    opacity: 70%;
  }
  .modal-base-footer-button-accept {
    background-color: #1890FF;
    color: #fff;
  }
  .modal-base-footer-button-accept:hover {
    opacity: 70%;
  }
  @media (min-width: 460px) {
    .modal-base-plate {
      padding: 48px 82px 0;
    }
    .modal-base-footer {
      padding: 0 32px 48px;
    }
  }
</style>
