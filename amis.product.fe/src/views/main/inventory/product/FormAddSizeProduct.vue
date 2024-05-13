<template>
    <div class="form-add-size-container" v-if="isVisible" @click="handleClick">
        <div class="form-add-size-body">
            <div class="wrapper" v-for="item in props.data">
                <base-input
                    :focus="true"
                    :type="'text'"
                    :maxLength="255"
                    :messageValid="'1'"
                    :placeholder="'Kích cỡ'"
                    :isSize="true"
                    v-model="item.size"
                ></base-input>
                <base-input
                    @handleChange="handleChange"
                    :type="'text'"
                    :maxLength="255"
                    :messageValid="'1'"
                    :placeholder="'Số lượng'"
                    :isNumber="true"
                    v-model="item.quantity"
                ></base-input>
            </div>
        </div>
        <div class="wrapper form-add-size-footer">
            <div class="wrapper function-wrapper">
                <div class="wrapper" style="height: 100%; align-items: center;" @click="addNewRow">
                    <div class="function-tag">
                        Thêm dòng
                    </div>
                </div>
                <div class="wrapper function-tag" style="height: 100%; align-items: center;" @click="handleDeleteAll">
                    Xóa
                </div>
            </div>
            <div class="size-total-amount a">Tổng số lượng:: {{totalAmount}}</div>
        </div>
    </div> 
</template>

<script setup lang="ts">
    import { ref, onBeforeMount } from 'vue';
    const totalAmount = ref(1);
    const props = defineProps(['data', 'isVisible']);
    const emit = defineEmits(['deleteAll']);
    function addNewRow() {
        props.data.push({'size': '', 'quantity': 0});
    }

    function handleChange() {
        totalAmount.value = 0;
        calculateTotalAmount();
    }

    function handleClick(event: any) {
        event.stopPropagation();
    }

    function handleDeleteAll() {
        emit('deleteAll');
    }

    function calculateTotalAmount() {
        for(let i = 0; i < props.data.length; i++) {
            totalAmount.value += Number.parseInt(props.data[i]?.quantity) ? Number.parseInt(props.data[i]?.quantity) : 0;
        }
    }

    onBeforeMount(() => {
        calculateTotalAmount();
    });
</script>

<style scoped>
    .form-add-size-container {
        width: calc(100% - 6px);
        position: absolute;
        background: #fff;
        z-index: 1;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    
    .form-add-size-body{
        max-height: 108px;
        overflow-y: scroll;
        padding-left: 2px;
    }

    .form-add-size-footer {
        height: 36px;
        width: 100%;
        align-items: center;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
    }

    .form-add-size-footer {
        background-color: var(--while__color);
        justify-content: space-between;
    }

    .icon-add {
        width: 36px;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--while__color);
        top: 0;
    }

    .select_icon-add {
        width: 16px;
        height: 16px;
        transition: all 0.3s ease;
        background: var(--url__icon) no-repeat;
        background-position: -31px -312px;
    }

    .size-total-amount{
        padding-right: 16px;
        height: 100%;
        line-height: 36px;
        flex: 1;
        text-align: right;
    }

    .function-tag {
        cursor: pointer;
        padding: 2px 6px;
    }
    
    .function-tag:hover {
        color: #fff;
        border-radius: 2px;
        background-color: #95d38d;
    }

    .function-wrapper{
        column-gap: 10px;
    }
</style>