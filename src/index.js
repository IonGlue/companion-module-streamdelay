const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpdateVariableDefinitions = require('../variables')
const UpdateActions = require('../actions')
const UpdateFeedbacks = require('../feedbacks')
const UpgradeScripts = require('../upgrades')

class StreamDelayInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.updateInterval = null
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.startVariableUpdate()
	}

	async destroy() {
		if (this.updateInterval) {
			clearInterval(this.updateInterval)
			this.updateInterval = null
		}
	}

	async configUpdated(config) {
		this.config = config
		// Restart the variable update with new config
		if (this.updateInterval) {
			clearInterval(this.updateInterval)
		}
		this.startVariableUpdate()
	}

	getConfigFields() {
		return [
			{
				type: 'number',
				id: 'hours',
				label: 'Delay Hours',
				min: 0,
				max: 23,
				default: 0,
				required: true,
				width: 6,
			},
			{
				type: 'number',
				id: 'minutes',
				label: 'Delay Minutes',
				min: 0,
				max: 59,
				default: 0,
				required: true,
				width: 6,
			},
			{
				type: 'number',
				id: 'seconds',
				label: 'Delay Seconds',
				min: 0,
				max: 59,
				default: 0,
				required: true,
				width: 6,
			},
		]
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	startVariableUpdate() {
		// Update every second
		this.updateInterval = setInterval(() => {
			const now = new Date()
			
			// Add configured delay
			const delayMs = (
				(this.config.hours || 0) * 3600000 + 
				(this.config.minutes || 0) * 60000 + 
				(this.config.seconds || 0) * 1000
			)
			const delayed = new Date(now.getTime() + delayMs)
			
			// Format with .000 for milliseconds
			const formattedTime = delayed.toISOString().split('.')[0] + '.000'
			
			this.setVariableValues({
				delayed_time: formattedTime,
			})
		}, 1000)
	}
}

runEntrypoint(StreamDelayInstance, UpgradeScripts)
