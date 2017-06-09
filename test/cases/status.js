const { expect } = require('chai');

module.exports = ({ agent }) => {
    it('should get status 200', () => {
        return agent.get('/api/status')
            .then(res => {
                expect(res.status).to.be.equal(200);
            });
    });
};
