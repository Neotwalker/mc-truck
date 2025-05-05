(function() {
	tinymce.PluginManager.add('open_form', function(editor) {
		editor.addButton('open_form', {
			text: 'Кнопка формы',
			icon: false,
			onclick: function() {
				// Получаем выделенный текст или дефолтную надпись
				var defaultLabel = editor.selection.getContent({ format: 'text' }) || 'Оставить заявку';
				editor.windowManager.open({
					title: 'Настройка кнопки',
					body: [
						{
							type: 'textbox',
							name: 'label',
							label: 'Текст кнопки',
							value: defaultLabel
						}
					],
					onsubmit: function(e) {
						// Экранирование текста через DOM API
						var safeLabel = editor.dom.encode(e.data.label);
						editor.insertContent('<button class="button open-form">' + safeLabel + '</button>');
					}
				});
			}
		});
	});
})();
