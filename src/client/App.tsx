import * as React from 'react';
import { useRef } from 'react';

export interface AppProps { }

const App: React.SFC<AppProps> = (props) => {

    const fileInput = useRef<HTMLInputElement>();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(fileInput.current.files[0]);
        const data = new FormData();
        data.append('title', 'Test blog title');
        data.append('content', 'lorem ipsum blah blah');
        data.append('blogImage', fileInput.current.files[0]);
        await fetch('/api/blogs', {
            method: 'POST',
            body: data
        });
    }

    return (
        <main className="container">
            <section className="row my-5 justify-content-center">
                <div className="col-md-9">
                    <form className="form-group p-3 border shadow">
                        <input ref={fileInput} type="file" className="form-control-file" />
                        {/* ref establishes a link around react into the physical dom */}
                        <button onClick={handleClick} className="btn btn-primary w-75 mx-auto mt-3 shadow">Submit</button>
                    </form>
                </div>
                <div className="col-md-12">
                    <img src="https://heathers-projects.s3.us-east-2.amazonaws.com/1574287088822-test.png" alt="test" id="test" />
                </div>
            </section>
        </main>
    );
}

export default App;