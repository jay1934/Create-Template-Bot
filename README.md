<div align="center">

# `Create-Template-Bot`

</div>

This is just a small CLI I use when creating a new bot for Fiverr (or in general). It's not the most complex, but it gets the job done.

---

<br>

## Creating a Bot

<br>

```
generate bot
```

This will:

- Initialize Git
- Download Prettier, ESLint, and other related plugins
- Copy all of the template files, including a command and event handler, and folder structure

<br>

### File Structure

<br>

```
|
| --- assets
| --- classes
   | --- Client.js
| --- commands
   | --- ping.js
| --- data
| --- events
   | --- client
      | --- debug.js
      | --- error.js
      | --- message.js
      | --- ready.js
      | --- warn.js
   | --- process
      | --- unhandledException.js
      | --- unhandledRejection.js
| --- handlers
   | --- commands.js
   | --- events.js
| --- eslintrc.json
| --- .gitignore
| --- .prettierrc.json
| --- config.json
| --- index.json
| --- package-lock.json
| --- packagage.json
| --- README.md
```

<br>

---

<br>

## Creating a Command

<br>

```
generate command
```

This will create a new file in the [`commands/` folder](/src/template/commands) with a command skeleton.

<br>

```js
module.exports = {
  match: /*  regex */,
  execute(message, args, client) {

  },
}
```

---

<br>

## Creating an Event

<br>

```
generate event
```

This will create a new file in the [`events/client/` folder](/src/template/events/client) with the event skeleton for the given event.

<br>

```js
module.exports = (/* arguments */) =>
  console.log(/* default message for the given event */);
```
