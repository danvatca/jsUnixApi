
(function() {
	HelloWorldJs = function() {
		this.m_count = 0;
	};

	HelloWorldJs.prototype.hello = function()
	{
		this.m_count++;
		return this.m_count + ". Hello World";
	};

	exports.HelloWorldJs = HelloWorldJs;
}());
