# Report abuse
---
## What you can report
You can report violations of [Discord's Terms of Service](https://discord.com/terms) or [Community Guidelines](https://discord.com/guidelines) that occur while using Emojifier. For issues outside Emojifier, follow [Discord's reporting instructions](https://dis.gd/howtoreport).

> [!NOTE]
> We **cannot** take action on a user's Discord account. Discord's Trust & Safety team handles account enforcement. We can remove Emojifier's messages or blacklist the user from using the bot.

## Send a report

1. Fill out the form and click **Copy report**.
2. Paste it into a DM to **BDL ModMail** in our [support server](https://discord.gg/MTwj6wG).
3. Send it with any screenshots or other evidence. After investigating, we'll reply back via DM.

> [!WARNING]
> Filling out this form won't send your report. **You need to DM it to BDL ModMail.**

## Report form

<form id="report-builder" class="report-builder" hidden>
  <p class="report-builder__hint">All fields are required unless marked optional.</p>
  <div class="report-builder__field">
    <label for="report-target">What are you reporting?</label>
    <select id="report-target" name="reportTarget" required aria-controls="report-id-hint report-user-details report-server-details">
      <option value="">Select one</option>
      <option value="reporting_user">A user</option>
      <option value="reporting_server">A server</option>
    </select>
  </div>
  <p id="report-id-hint" class="report-builder__hint" hidden>Copy the ID from Discord. <a href="https://dis.gd/findmyid" target="_blank" rel="noopener noreferrer">How to find IDs</a></p>
  <fieldset id="report-user-details" data-report-target="reporting_user" hidden disabled>
    <legend>User details</legend>
    <div class="report-builder__field">
      <label for="report-user-id">User ID</label>
      <input id="report-user-id" name="userId" type="text" inputmode="numeric" pattern="[0-9]+" title="Enter a numeric Discord user ID." required>
    </div>
  </fieldset>
  <fieldset id="report-server-details" data-report-target="reporting_server" hidden disabled>
    <legend>Server details</legend>
    <div class="report-builder__field">
      <label for="report-server-id">Server ID</label>
      <input id="report-server-id" name="serverId" type="text" inputmode="numeric" pattern="[0-9]+" title="Enter a numeric Discord server ID." required>
    </div>
    <div class="report-builder__grid">
      <div class="report-builder__field">
        <label for="report-channel-id">Channel ID <span class="report-builder__optional">(optional)</span></label>
        <input id="report-channel-id" name="channelId" type="text" inputmode="numeric" pattern="[0-9]+" title="Enter a numeric Discord channel ID.">
      </div>
      <div class="report-builder__field">
        <label for="report-message-id">Message ID <span class="report-builder__optional">(optional)</span></label>
        <input id="report-message-id" name="messageId" type="text" inputmode="numeric" pattern="[0-9]+" title="Enter a numeric Discord message ID.">
      </div>
    </div>
  </fieldset>
  <div class="report-builder__field">
    <label for="report-subject">Subject</label>
    <input id="report-subject" name="subject" type="text" maxlength="150" required>
  </div>
  <div class="report-builder__field">
    <label for="report-description">What happened?</label>
    <textarea id="report-description" name="description" rows="6" aria-describedby="report-description-hint" required></textarea>
    <p id="report-description-hint" class="report-builder__hint">Tell us what happened and include any message links.</p>
  </div>
  <section class="report-builder__preview" aria-labelledby="report-preview-heading">
    <h3 id="report-preview-heading">Preview</h3>
    <p id="report-preview-hint" class="report-builder__hint"></p>
    <div id="report-messages"></div>
  </section>
</form>

> [!NOTE]
> Our team takes action within 24 hours of every report and we can only take action on issues that occur while using our bot.

![safety](../images/safety.png)
