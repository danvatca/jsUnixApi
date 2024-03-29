#include <v8.h>
#include <node.h>

using namespace node;
using namespace v8;

class HelloWorld: ObjectWrap
{
	private:
		int m_count;
	public:
		static Persistent<FunctionTemplate> s_ct;

		static void Init(Handle<Object> target) {
			HandleScope scope;

			Local<FunctionTemplate> t = FunctionTemplate::New(New);

			s_ct = Persistent<FunctionTemplate>::New(t);
			s_ct->InstanceTemplate()->SetInternalFieldCount(1);
			s_ct->SetClassName(String::NewSymbol("HelloWorld"));

			NODE_SET_PROTOTYPE_METHOD(s_ct, "hello", Hello);

			target->Set(String::NewSymbol("HelloWorld"), s_ct->GetFunction());
		}

		HelloWorld() : m_count(0) { }
		~HelloWorld() { }

		static Handle<Value> New(const Arguments& args) {
			HandleScope scope;
			HelloWorld* hw = new HelloWorld();
			hw->Wrap(args.This());
			return args.This();
		}

		static Handle<Value> Hello(const Arguments& args) {
			HandleScope scope;
			HelloWorld* hw = ObjectWrap::Unwrap<HelloWorld>(args.This());
			hw->m_count++;
			Local<Array> result = Array::New(2);
			result->Set(Number::New(0), String::New("e1000g0"));
			result->Set(Number::New(1), String::New("igb0"));
			return scope.Close(result);
		}
};

Persistent<FunctionTemplate> HelloWorld::s_ct;

extern "C" {
	static void init (Handle<Object> target) {
		HelloWorld::Init(target);
	}
	NODE_MODULE(helloworld, init);
}
