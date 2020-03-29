/*
 * 	exTable ($.widget) 0.1.0 - jQuery plugin
 *	written by Cyokodog	
 *
 *	Copyright (c) 2009 Cyokodog (http://d.hatena.ne.jp/cyokodog/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */


(function($){
	$.widget("ex.exTable", {
		_init: function(){
			var o = this,c = o.options;
	
	        //新設するウィジェットの外枠を生成
	        c.container = $('<div class="ex-table-container">' +
	            '<div class="ex-table-head"><table/></div>' +
	            '<div class="ex-table-body"></div>' +
	            '<div class="ex-table-foot"><table/></div>' +
	            '</div>');
	
	        //ウィジェットのヘッダ、ボディ、フッタ枠の取得と幅調整
	        c.head = c.container.find('> div.ex-table-head').css({
	            'padding-right':c.scrollbarWidth
	        });
	        c.foot = c.container.find('> div.ex-table-foot').css({
	            'padding-right':c.scrollbarWidth
	        });
	        c.body = c.container.find('> div.ex-table-body').css({
	            'overflow-x' : 'hidden',
	            'overflow-y' : 'scroll',
	            height : c.height
	        });
	
	        //処理対象テーブルの thead / tbody / tfoot の取得
			var thead = o.element.find('> thead')
	            ,tfoot = o.element.find('> tfoot')
	            ,tbody = o.element.find('> tbody');
	
	        //幅を固定する
	        o._fixedWidth(thead);
	        o._fixedWidth(tfoot);
	        o._fixedWidth(tbody);
	        c.container.width(o.element.width()+c.scrollbarWidth);
	
	        //新設するウィジェットの外枠をページに挿入
	        o.element.after(c.container);
	
	        //ウィジェットのヘッダ、フッタ枠に thead と tfoot を挿入
	        o.element.find('> thead').appendTo(c.head.find('> table'));
	        o.element.find('> tfoot').appendTo(c.foot.find('> table'));
	        o.element.appendTo(c.body);

			//スクロールイベントの割り当て			
			c.body.scroll(function(){
				o.element.trigger('exTable_scroll');
			});

		},
	    _fixedWidth : function(stack){
	        var cols = stack.find('> tr:eq(0) > *');
	        cols.each(function( idx ){
	            var col = cols.eq(idx);
	            col.width(col.width());
	        });
	    },
			
	    //CSS セッターメソッド
		setContainerCSS : function(css){
			this.options.container.css(css);
		},
		setBodyCSS : function(css){
			this.options.body.css(css);
		},
		setCellsCSS : function(selector,css){
			this.options.container.find(selector || 'th,td').css(css);
		},
	
	    //内部生成要素の ゲッターメソッド
	    getContainer : function(){
			return this.options.container;
	    },
	    getHead : function(){
	        return this.options.head;        
	    },
	    getBody : function(){
	        return this.options.body;        
	    },
	    getFoot : function(){
	        return this.options.foot;        
	    }
	});
	$.extend($.ex.exTable, {
		version: '0.1.0',
		getter: 'getContainer getHead getBody getFoot',
		defaults: {
	        scrollbarWidth :16,
	        height : 200
		}
	});
})(jQuery);

/*
(function($){
	$.widget("ex.exTable", {
		_init: function(){
			var o = this,c = o.options;
	
	        //新設するウィジェットの外枠を生成
	        c.container = $('<div class="ex-table-container">' +
	            '<div class="ex-table-head"><table/></div>' +
	            '<div class="ex-table-body"></div>' +
	            '<div class="ex-table-foot"><table/></div>' +
	            '</div>');
	
	        //ウィジェットのヘッダ、ボディ、フッタ枠の取得と幅調整
	        c.head = c.container.find('> div.ex-table-head');
	        c.foot = c.container.find('> div.ex-table-foot');
	        c.body = c.container.find('> div.ex-table-body').css({
	            'overflow-x' : c.overflowX,
	            'overflow-y' : c.overflowY,
	            height : c.height
	        });
	
	        //処理対象テーブルの thead / tbody / tfoot の取得
			var thead = o.element.find('> thead')
	            ,tfoot = o.element.find('> tfoot')
	            ,tbody = o.element.find('> tbody');
	
	        //幅を固定する
	        o._fixedWidth(thead);
	        o._fixedWidth(tfoot);
	        o._fixedWidth(tbody);

if(c.overflowX != 'hidden'){
    c.head.css({
        'padding-right':c.scrollbarWidth
    });
    c.foot.css({
        'padding-right':c.scrollbarWidth
    });
	c.container.width(o.element.width()+c.scrollbarWidth);
}


	        //新設するウィジェットの外枠をページに挿入
	        o.element.after(c.container);
	
	        //ウィジェットのヘッダ、フッタ枠に thead と tfoot を挿入
	        o.element.find('> thead').appendTo(c.head.find('> table'));
	        o.element.find('> tfoot').appendTo(c.foot.find('> table'));
	        o.element.appendTo(c.body);



c.body.scroll(function(){
	o.element.trigger('ex-table-scroll');
})



		},
	    _fixedWidth : function(stack){
	        var cols = stack.find('> tr:eq(0) > *');
	        cols.each(function( idx ){
	            var col = cols.eq(idx);
	            col.width(col.width());
	        });
	    },

		//新規追加
		setContainerCSS : function(css){
			this.options.container.css(css);
		},
		setBodyCSS : function(css){
			this.options.body.css(css);
		},
		setCellsCSS : function(selector,css){
			this.options.container.find(selector || 'th,td').css(css);
		},

setScrollTop : function(top){
	this.options.body.scrollTop(top);
},


	    //以下は利用者向けの ゲッターメソッド
	    getContainer : function(){
			return this.options.container;
	    },
	    getHead : function(){
	        return this.options.head;        
	    },
	    getBody : function(){
	        return this.options.body;        
	    },
	    getFoot : function(){
	        return this.options.foot;        
	    }
	});
	$.extend($.ex.exTable, {
		version: '0.1.0',
		getter: 'getScrollTop getContainer getHead getBody getFoot',
		defaults: {
	        scrollbarWidth :16,
	        height : 200,
            overflowX : 'hidden',
            overflowY : 'scroll'
		}
	});
})(jQuery);
*/

