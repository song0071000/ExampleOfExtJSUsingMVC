Ext.define('MyApp.controller.User', {
    extend: 'Ext.app.Controller',
    stores: ['User'],
    models: ['User'],
    views: ['Viewport', 'user.List', 'user.Edit'],
    init: function () {
		//这里去设置响应事件
        this.control({
            'userlist': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.saveUser
            },
			'useredit button[action=add]': {
                click: this.addUser
            },
			'userlist button[action=add]' : {
				click: this.editAddUser
			}
        });
    },
    editUser: function (grid, record) {
		//使用widget方法直接去创建组件
        var win = Ext.widget("useredit"); 
		//这里需要注意的是down、on方法只能够获取第一个匹配的组件，若是存在多个相同的组件。
		//那么很可能你永远只能获取该类型组件的第一个。
        win.down("form").loadRecord(record);
		//这里使用ComponentQuery的query方法去查询组件了，注意它返回的是满足条件的所有的数组，
		//如果你确定它返回的只有一个对象时，那么你就可以取数组的第一个元素，从而得到该组件。
		var btnAdd= Ext.ComponentQuery.query('button[text = "增加"]');
		btnAdd[0].setVisible(0);
        win.show();
    },
    saveUser: function (btn) {
		//这里的window是该弹出窗的window而不是list窗的window
        var win = btn.up("window"),
            form = win.down("form").getForm(),
            record = form.getRecord();
        form.updateRecord();
        record.commit();
        win.close();
    },
	editAddUser: function(btn) {
		var win = Ext.widget("useredit"); 
		var btnEdit= Ext.ComponentQuery.query('button[text = "保存"]');
		btnEdit[0].setVisible(0);
        win.show();
	},
	
	addUser: function (btn) {
        var win = btn.up("window"),
            form = win.down("form").getForm(),
            record = form.getRecord();
		//直接使用getCmp去获取相关组件了，这里要求该组件要设置id。
		var store = Ext.getCmp("widgetUserlist").store;
		//
		store.insert(0,form.getValues());
        win.close();
    }
});