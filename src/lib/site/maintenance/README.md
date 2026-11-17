# Maintenance Mode

Putting the site into "maintenance mode" blocks off the trainer and fakemon pages, pages where people require a database to do stuff.

Why do this?

To make some important blocking updates to the database or other parts of the infrastructure. Rather than create a window where people's requests will fail inexplicably, it's better to be intentional, block off some time, run the scripts, do testing, and roll back if needed.

## How?

It's all driven by a single file, [maintenance.json](/static/system/maintenance.json).

### 1) Announce

```json
{
	"status": "upcoming",
	"scheduledStart": "2026-11-19T13:00:00.000Z",
	"duration": "15 minutes",
	"reason": "Database improvements to speed up loading Trainers and Fakémon."
}
```

### 2) Start

```json
{
	"status": "inprogress",
	"scheduledStart": "2026-11-19T13:00:00.000Z",
	"duration": "15 minutes",
	"reason": "Database improvements to speed up loading Trainers and Fakémon."
}
```

### 3) Run and Verify

Use the `OverrideMaintenance` localstorage variable (set to "true") to get past the maintenance banner and verify everything is working as expected.

### 4) Finish

```json
{
	"status": "none"
}
```