/*就地编辑组件
 *created by zx
 *2016-8-23
 *每个人都要有优雅的写代码
 */
 'use strict';

 class EditInPlaceField{
   constructor(id, parent, value){
     this.id = id;
     this.value = value || 'default value';
     this.containerElement = null;
     this.parentElement = parent;
     this.createElement(this.id);
     //绑定事件
     this.attachEvents();
   }
   createElement(id) {
     this.containerElement = document.createElement('div');
     this.parentElement.appendChild(this.containerElement);
     this.containerElement.setAttribute('id',id);
     this.staticElement = document.createElement('span');
     this.containerElement.appendChild(this.staticElement);
     this.staticElement.innerHTML = this.value;

     //创建input
     this.fieldElement = document.createElement('input');
     //类型为text
     this.fieldElement.type = 'text';
     // 值为无名氏
     this.fieldElement.value = this.value;
     // 加到containerElement
     this.containerElement.appendChild(this.fieldElement);

     // 创建保存按钮
     this.saveButton = document.createElement('input');
     this.saveButton.type = 'button';
     this.saveButton.value = '保存';
     this.containerElement.appendChild(this.saveButton);

     //创建一个取消按钮
     this.canceButton = document.createElement('input');
     this.canceButton.type = 'button';
     this.canceButton.value = '取消';
     this.containerElement.appendChild(this.canceButton);

     this.convertToText();
   }
   //将编辑框及按钮隐藏  只显示文本状态
   convertToText() {
     this.fieldElement.style.display = 'none';//藏起来
     this.saveButton.style.display = 'none';
     this.canceButton.style.display = 'none';
     this.staticElement.style.display = 'inline';
     this.setValue(this.value);
   }
   attachEvents() {
     var that = this;
     // span的点击事件  将状态切为编辑状态
     this.staticElement.addEventListener('dblclick',function() {
       that.convertToEditable();
     },false)

     this.canceButton.addEventListener('click',function() {
       that.convertToText();
     },false)

     this.saveButton.addEventListener('click',function() {
       that.convertToText();
     },false)
   }
   convertToEditable() {
     //将span隐藏
     this.staticElement.style.display = 'none';
     this.fieldElement.style.display = 'inline';//拿出来
     this.saveButton.style.display = 'inline';
     this.canceButton.style.display = 'inline';

     //设置input的value
     this.setValue(this.value);
   }
   setValue(value) {
     //同步input 和span
     this.staticElement.innerHTML = this.fieldElement.value;
   }
 }
