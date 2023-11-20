<template>
    <div>

        <v-data-table :id="id" ref="vDataTable" class="gtg-data-table" multi-sort :class="classes" :headers="fieldsInfo"
            :items="tableItems" :items-per-page="items_per_page" :loading="dataItems.loading" :single-expand="false"
            :expanded.sync="expanded" item-key="Id" :show-group-by="false" :show-select="showSelect" :single-select="singleSelect"
            loading-text="Loading  ..." :footer-props="{
                'items-per-page-options': [items_per_page, 20, 50, 100, -1],
                showFirstLastPage: true,
                'items-per-page-text': 'Items per page  ',
            }">

            <!-- :loading="dataItems.loading"
            :options.sync="options" :server-items-length="dataItems.totalCount" loading-text="در حال بارگذاری..."
            :show-select="showSelect" :single-select="singleSelect" :hide-default-footer="!showFooter" :show-expand="showExpand"
            :single-expand="singleExpand" :expanded.sync="expanded" :disable-sort="disableSort" :item-key="itemKey"
            :dense="dense" :style="styles" :group-by="groupBy" :show-group-by="false" :footer-props="{
                'items-per-page-options': [items_per_page, 20, 50, 100, -1],
                showFirstLastPage: true,
                'items-per-page-text': 'تعداد در صفحه',
            }" @click:row="$emit('row-clicked', $event)" -->




            <template #no-data>
                <span> No data found !</span>
            </template>

            <template #[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} from {{ items.itemsLength }}
            </template>

            <!-- <template v-if="showExpand" #expanded-item="{ headers, item }">
            <td :colspan="headers.length" :class="{
                'ma-0 pa-0': true,
                'expanded-closing': !transitioned[item.id],
            }" style="height: auto">
                <v-expand-transition>
                    <div v-show="transitioned[item.id]">
                        <div class="pa-1" style="min-height: 100px">
                            <slot name="expanded-layout" :item="item" />
                        </div>
                    </div>
                </v-expand-transition>
            </td>
        </template>

        <template v-if="showExpand" #[`item.data-table-expand`]="props">
            <v-icon :class="{
                'v-data-table__expand-icon': true,
                'v-data-table__expand-icon--active':
                    props.isExpanded && transitioned[props.item.id],
            }" @click="toggleExpand(props)">
                mdi-chevron-down
            </v-icon>
        </template> -->

            <template v-if="showHeader" #top>
                <div>
                    <MccToolbar flat color="background" :elevation="0" :dense="false" classes="ma-0">
                        <v-icon v-if="slotTitlePassed" right>mdi-file-table-outline</v-icon>
                        <h4>

                            <slot name="title" />
                        </h4>

                        <template v-if="showFilter">
                            <v-divider class="mx-4" inset vertical />
                            <v-TextField :id="`${id}_filter`" v-model="search" append-icon="mdi-magnify" :outlined="false"
                                type="search" label=" Search  " single-line />
                        </template>

                        <template v-else>
                            <slot style="text-align: right;" name="header">
                                <v-spacer />
                            </slot>
                        </template>

                        <template v-if="!!$slots['add-template']">
                            <v-divider class="mx-4" inset vertical />

                            <slot name="add-template" style="flex-grow: 1 !important" />
                        </template>


                        <!-- <gtg-search-form v-if="showSearch && fieldsInfo.some((x) => x.searchable === true)"
                        style="flex-grow: 1 !important" :fields="fieldsInfo" @ShowResult="getResult($event)" /> -->
                    </MccToolbar>
                    <!--                موارد جستجو-->
                    <!-- <div v-if="searchParam.length" class="mt-n4 py-3">
                    <span class="mr-2">موارد جستجو:</span>

                    <v-chip v-for="(item, key) in searchParam" :key="key" class="mr-1" small close
                        close-icon="mdi-close-circle-outline" @click:close="removeSearchValue(item)">
                        <span>{{ item.title }} :</span>
                        &nbsp;
                        <span v-if="item.type === 6">
                            {{ item.value | miladyToShamsiDate }}
                        </span>
                        <span v-else>{{ item.value }}</span>
                    </v-chip>
                    <v-divider class="my-2" />
                </div> -->
                    <slot name="top" />

                </div>
            </template>


            <!-- محل قرارگیری ستون‌های سفارشی -->
            <template v-for="col in specialCols" #[col]="{ item }">

                <slot :name="`${col}`" :item="item" />

            </template>




            <!-- <template v-if="showSumColumn" #[`body.append`]>
           
            <tr v-if="showSumColumn">
                <td v-for="(col, i) in fieldsInfo" :key="i" :style="`text-align: ${col.align}`">
                    <span v-if="!col.sumCalculation && i === 0" class="primary--text font-weight-bold">
                        جمع
                    </span>
                    <span v-if="col.sumCalculation">
                        <span class="font-weight-bold primary--text text-no-wrap">
                            {{ sumField(dataList, col.value) | thousandSeparator }}
                            {{ col.suffix ? col.suffix : '' }}
                        </span>
                    </span>
                </td>
            </tr>
        </template> -->
        </v-data-table>
    </div>
</template>

<script>

export default {
    name: 'GtgDataTable',

    props: {
        subSystems: {
            type: Array,
            default() {
                return [{}];
            },
        },
        //  شناسه
        id: { type: String, default: '' },
        //  تعداد آیتم در صفحه
        items_per_page: { type: Number, default: 5 },
        //  لیست فیلدهای گرید و فرم جستجو با تنظیمات آنها
        //  [{ text, value, align, sortable, filterable, searchable, searchValue, type }]

        fieldsInfo: {
            type: Array,
            default() {
                return [{}];
            },
        },
        tableItems: {
            type: Array,
            default() {
                return [{}];
            },
        },
        //  لیست دیتاهای گرید به همراه اطلاعات وضعیت و تعداد
        //  { items, totalCount, loading}
        dataItems: {
            type: Object,
            default() {
                return { items: [], totalCount: 0, loading: false };
            },
        },
        //  لیست اسامی ستون‌های سفارشی
        //  [item.${...}]
        specialCols: { Type: Array },
        //  نمایش فیلتر که پیشفرض قابل نمایش است
        //  boolean (default id true)
        showFilter: { type: Boolean, default: true },
        //  غیر فعال کردن sort
        disableSort: { type: Boolean, default: false },
        //  نمایش ستون انتخاب ردیف‌ها
        //  boolean (default false)
        showSelect: { type: Boolean, default: false },
        //  امکان انتخاب فقط یک ردیف
        singleSelect: { type: Boolean, default: true },
        //  نمایش جستجوی کلی
        showSearch: { type: Boolean, default: true },
        //  نمایش فوتر شامل pagination و ..
        showFooter: { type: Boolean, default: true },
        //  نمایش هدر و ..
        showHeader: { type: Boolean, default: true },
        //  قابلیت اکسپند داشتن جدول
        showExpand: { type: Boolean, default: false },
        //  نمایش گروه بندی ردیف‌ها
        showGroup: { type: Boolean, default: false },
        //  نمایش سرچ آسان
        showEasySearch: { type: Boolean, default: false },
        //  اسم ستونی مورد استفاده برای گروهبندی
        groupBy: { type: String },
        //  امکان اکسپند شدن فقط یک ردیف
        singleExpand: { type: Boolean, default: true },
        //  اکسپند بودن اولین آیتم
        expandedFirst: { type: Boolean, default: false },
        //  وجه تمایز سطرهای جدول
        itemKey: { type: String, default: 'id' },
        //  dense شدن ردیف‌ها
        dense: { type: Boolean, default: false },
        //  کلاس‌های دلخواه
        classes: { type: String, default: 'elevation-1' },
        //  استایل‌های دلخواه
        styles: { type: String, default: '' },
        //  موارد انتخاب شده
        value: { type: Array },
        //  نمایش مجموع ستون‌ها
        showSumColumn: { type: Boolean, default: false },
        //  ستونی که به صورت پیش فرض روی آن مرتب می شود
        orderByItem: { type: Array },
        defaultSortDesc: { type: Array },
    },
    data() {
        return {
            //  دریافت عبارت از کاربر برای فیلتر و جستجو بین اطلاعات گرید
            search: '',
            //  موارد سرچ شده برای نمایش
            searchParam: [],

            //  پارامترهای تنظیمات گرید
            options: {
                page: 1,
                sortBy: this.orderByItem ? this.orderByItem : [],
                itemsPerPage: this.items_per_page,
                sortDesc: this.defaultSortDesc
                    ? this.defaultSortDesc
                    : Array.from(
                        { length: this.orderByItem && this.orderByItem.length },
                        () => true,
                    ),
            },
            //  آیتم اکسپند شده
            expanded: [],
            //  برای تغییرات ترنزیشن در حالت اکسپند
            transitioned: [],
            closeTimeouts: {},
        };
    },

    computed: {
        selectedItems: {
            get() {
                return this.value;
            },
            set(selectItem) {
                this.$emit('input', selectItem);
            },
        },

        //  dataList() {
        //      //  انجام عملیات دلخواه از قبیل فیلتر کردن و... روی دیتاهای دریافتی از Api
        //      if (this.search && this.dataItems.items) {
        //          //  پیاده سازی کاستوم فیلتر
        //          return this.dataItems.items.filter((item) => {
        //              //  برای اینکه روی دیتای اصلی تاثیر نگذارد
        //              const tempItem = JSON.parse(JSON.stringify(item));
        //              //  حذف ستون conCurrency چون ولیوی این ستون احتیاج نیست
        //              delete tempItem.concurrencyToken;
        //              return getObjectValues(tempItem)
        //                  .toLowerCase()
        //                  .includes(this.search);
        //          });
        //      } else return this.dataItems.items;
        //  },

        // محاسبه تعداد آیتم‌ها در data-table
        itemsPerPage() {
            const items = [];
            if (this.dataItems.totalCount >= 10) items.push(10);
            if (this.dataItems.totalCount >= 25) items.push(25);
            if (this.dataItems.totalCount >= 50) items.push(50);
            if (this.dataItems.totalCount >= 100) items.push(100);
            items.push(-1);
            return items;
        },

        groupByColumn() {
            return this.fieldsInfo.find(
                (x) => x.groupable || x.value === this.groupBy,
            );
        },

        slotTitlePassed() {
            return 'title' in this.$slots;
        },
    },

    // watch: {
    //     // دریافت مجدد اطلاعات بعد از تغییر تنظیمات گرید از جمله صفحه بندی و ...
    //     options: {
    //         handler() {
    //             this.getResult();
    //         },
    //         deep: true,
    //     },


    // },

    methods: {
        // getResult(){
        //     this.$emit('getData', options);
        // },
        resetResult() {
            this.fields
                .filter((x) => x.searchable === true)
                .forEach((item) => {
                    item.searchValue = undefined;
                    item.selectedItems = undefined;
                });
        },

        checkExpandItems() {
            //  وقتی دیتا لود شد و  آیتم‌ها را اکسپند کن
            if (this.showExpand && this.expandedFirst) {
                if (!this.expanded || this.expanded.length === 0) {
                    if (this.dataList && this.dataList.length > 0)
                        this.expanded = [this.dataList[0]];
                    else return;
                }

                this.expanded.forEach((item) => {
                    //  اضافه کردن آیتم جاری به عنوان آیتم در حال بسته شدن
                    this.$set(this.transitioned, item.id, true);
                    //  حذف لی اوت expand شده از دام بعد از سپری شده زمان کافی از تمام شدن انیمیشن
                    this.closeTimeouts[item.id] = setTimeout(
                        () => this.$refs.vDataTable.expand(item, true),
                        700,
                    );
                });
            }
        },

        toggleExpand(props) {
            const item = props.item;
            const id = item.id;

            if (props.isExpanded && this.transitioned[id]) {
                //  اگر قبلا لی اوت expand شده بود و در حال close نبود، لی اوت را close کن
                this.closeExpand(item);
            } else {
                //  اگر لی اوت بسته بود و یا در حال بستن بود لی اوت را expand کن
                //  اگر در حال بستن لی اوت بود، لی اوت را close نکن
                clearTimeout(this.closeTimeouts[id]);
                //  لی اوت آیتم را اکسپند کن
                props.expand(true);
                //  لی اوت را بعد از سپری شدن زمان مناسب که به دام اضافه شد با انیمیشن نمایش بده
                this.$nextTick(() => this.$set(this.transitioned, id, true));
                //  اگر single-expand است تمام لی اوت‌های expand شده را نمایش بده
                if (this.singleExpand)
                    this.$nextTick(() =>
                        this.expanded.forEach((i) => i !== item && this.closeExpand(i)),
                    );
            }
        },

        closeExpand(item) {
            const id = item.id;
            //  اضافه کردن آیتم جاری به عنوان آیتم در حال بسته شدن
            this.$set(this.transitioned, id, false);
            //  حذف لی اوت expand شده از دام بعد از سپری شده زمان کافی از تمام شدن انیمیشن
            this.closeTimeouts[id] = setTimeout(
                () => this.$refs.vDataTable.expand(item, false),
                600,
            );
        },

        // 
        //  sumField(key) {
        //      //  sum data in give key (property)
        //      return this.dataList.reduce((a, b) => Number(a) + (Number(b[key]) || 0), 0)
        //  },
    },
};
</script>

<style lang="scss">
.v-data-table__expanded.v-data-table__expanded__row {
    background-color: var(--v-background-base);
}

.expanded-closing {
    border-bottom: none !important;
}

.v-row-group__header {
    background-color: var(--v-background-base);
}

.noHover:hover {
    background-color: var(--v-background-base) !important;
}

.v-data-table-header {
    background: rgb(216, 215, 215);
    font-weight: bold;
    color: black;
}

.v-data-table__wrapper tbody tr:nth-child(even) {
    background: var(--v-formBackground-base);
}

.v-data-table__wrapper tr {
    transition: all 0.3s ease-in-out;
}
</style>
