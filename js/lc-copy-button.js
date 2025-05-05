(function() {
	tinymce.PluginManager.add('lc_copy', function(editor, url) {
		editor.addButton('lc_copy', {
			title: 'Вставить [copy]',
			icon: 'copy',
			cmd: 'insert_lc_copy_shortcode'
		});

		editor.addCommand('insert_lc_copy_shortcode', function() {
			editor.windowManager.open({
				title: 'Добавить шорткод копирования',
				body: [
					{
						type: 'textbox',
						name: 'text',
						label: 'Текст для копирования'
					},
					{
						type: 'textbox',
						name: 'display',
						label: 'Текст на экране'
					}
				],
				onsubmit: function(e) {
					var shortcode = '[copy text="' + e.data.text + '"]' + e.data.display + '[/copy]';
					editor.insertContent(shortcode);
				}
			});
		});
	});
})();
