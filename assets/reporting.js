(function () {
  'use strict';

  var messageLimit = 2000;

  function splitMessage(message) {
    var parts = [];

    while (message.length > messageLimit) {
      var end = messageLimit;
      var boundary = message.lastIndexOf('\n', end - 1);

      if (boundary < messageLimit / 2) {
        boundary = message.lastIndexOf(' ', end - 1);
      }
      if (boundary >= messageLimit / 2) {
        end = boundary + 1;
      }

      // Keep UTF-16 surrogate pairs together when splitting text with emoji.
      var lastCodeUnit = message.charCodeAt(end - 1);
      if (lastCodeUnit >= 0xd800 && lastCodeUnit <= 0xdbff) {
        end -= 1;
      }

      parts.push(message.slice(0, end));
      message = message.slice(end);
    }

    parts.push(message);
    return parts;
  }

  function initializeReportBuilder() {
    var form = document.getElementById('report-builder');
    if (!form || form.dataset.initialized) return;
    form.dataset.initialized = 'true';

    var fields = form.elements;
    var messages = document.getElementById('report-messages');
    var previewHint = document.getElementById('report-preview-hint');
    var renderedText;

    function value(name) {
      return fields.namedItem(name).value.trim();
    }

    function validateText() {
      ['subject', 'description'].forEach(function (name) {
        fields.namedItem(name).setCustomValidity(
          value(name) ? '' : (name === 'subject' ? 'Add a subject.' : 'Tell us what happened.')
        );
      });
    }

    function reportText() {
      var target = value('reportTarget');
      var lines = [
        '**Emojifier abuse report**',
        '**Reporting:** ' + (target === 'reporting_user' ? 'User' : target === 'reporting_server' ? 'Server' : '')
      ];

      if (target === 'reporting_user') {
        lines.push('**User ID:** ' + value('userId'));
      } else if (target === 'reporting_server') {
        lines.push('**Server ID:** ' + value('serverId'));
        if (value('channelId')) lines.push('**Channel ID:** ' + value('channelId'));
        if (value('messageId')) lines.push('**Message ID:** ' + value('messageId'));
      }

      lines.push('**Subject:** ' + value('subject'), '', '**Description:**', value('description'));
      return lines.join('\n');
    }

    async function copyMessage(button, textarea, status) {
      validateText();
      if (!form.reportValidity()) return;

      button.disabled = true;
      try {
        await navigator.clipboard.writeText(textarea.value);
        button.textContent = 'Copied!';
        status.textContent = 'Paste it into a DM to BDL ModMail and send it.';
      } catch (error) {
        textarea.focus();
        textarea.select();
        status.textContent = "Couldn't copy the report. Copy the selected text, then send it to BDL ModMail.";
      } finally {
        button.disabled = false;
      }
    }

    function renderPreview() {
      var target = value('reportTarget');
      form.querySelectorAll('[data-report-target]').forEach(function (group) {
        group.hidden = group.dataset.reportTarget !== target;
        group.disabled = group.hidden;
      });
      validateText();

      var text = reportText();
      // A blur/change event after typing must not replace a copy button mid-click.
      if (text === renderedText) return;
      renderedText = text;
      var parts = splitMessage(text);
      previewHint.textContent = parts.length === 1
        ? 'Copy this and send it to BDL ModMail.'
        : 'This report needs ' + parts.length + ' messages. Send them to BDL ModMail in order.';
      messages.replaceChildren();

      parts.forEach(function (part, index) {
        var container = document.createElement('div');
        container.className = 'report-builder__message';

        var label = document.createElement('label');
        var textarea = document.createElement('textarea');
        textarea.id = 'report-message-' + (index + 1);
        textarea.readOnly = true;
        textarea.rows = Math.min(12, Math.max(6, part.split('\n').length));
        textarea.value = part;
        textarea.spellcheck = false;
        label.htmlFor = textarea.id;
        label.textContent = parts.length === 1 ? 'Your report' : 'Message ' + (index + 1) + ' of ' + parts.length;

        var actions = document.createElement('div');
        actions.className = 'report-builder__actions';
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = parts.length === 1 ? 'Copy report' : 'Copy message ' + (index + 1) + ' of ' + parts.length;
        var count = document.createElement('span');
        count.className = 'report-builder__count';
        count.textContent = part.length + ' / ' + messageLimit + ' characters';

        var status = document.createElement('p');
        status.className = 'report-builder__status';
        status.id = textarea.id + '-status';
        status.setAttribute('role', 'status');
        button.setAttribute('aria-describedby', status.id);
        button.addEventListener('click', function () {
          copyMessage(button, textarea, status);
        });

        actions.append(button, count);
        container.append(label, textarea, actions, status);
        messages.append(container);
      });
    }

    form.addEventListener('input', renderPreview);
    form.addEventListener('change', renderPreview);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    renderPreview();
    form.hidden = false;
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    hook.doneEach(initializeReportBuilder);
  });
}());
