const TextDecoder = require('text-encoding').TextDecoder;

class Asset {
    /**
     * Construct an Asset.
     * @param {AssetType} assetType - The type of this asset (sound, image, etc.)
     * @param {string} assetId - The ID of this asset.
     * @param {DataFormat} [dataFormat] - The format of the data (WAV, PNG, etc.); required iff `data` is present.
     * @param {Buffer} [data] - The in-memory data for this asset; optional.
     */
    constructor (assetType, assetId, dataFormat, data) {
        /** @type {AssetType} */
        this.assetType = assetType;

        /** @type {string} */
        this.assetId = assetId;
        if (data && !dataFormat) {
            throw new Error('Data provided without specifying its format');
        }

        /** @type {DataFormat} */
        this.dataFormat = dataFormat;

        /** @type {Buffer} */
        this.data = data;

        /** @type {Asset[]} */
        this.dependencies = [];
    }

    /**
     * @returns {string} - This asset's data, decoded as text.
     */
    decodeText () {
        const decoder = new TextDecoder();
        return decoder.decode(this.data);
    }

    /**
     * @param {string} [contentType] - Optionally override the content type to be included in the data URI.
     * @returns {string} - A data URI representing the asset's data.
     */
    encodeDataURI (contentType) {
        return [
            'data:',
            contentType || this.assetType.contentType,
            ';base64,',
            this.data.toString('base64')
        ].join('');
    }
}

module.exports = Asset;
