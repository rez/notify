export const getActiveDevice = () => {
    const devices = this.props.player.devices;
    const device = devices.find((device) => {
        return device.is_active;
    });

    return null;
};