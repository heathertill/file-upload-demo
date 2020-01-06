import * as React from 'react';
import { useRef, useState } from 'react';


export interface AppProps { }

const App: React.SFC<AppProps> = (props) => {

    const fileInput = useRef<HTMLInputElement>();

    const [file, setFile] = useState();
    const [show, setShow] = useState(false)

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(fileInput.current.files[0]);
        const data = new FormData();
        data.append('title', 'Test blog title');
        data.append('content', 'lorem ipsum blah blah');
        data.append('blogImage', fileInput.current.files[0]);
        let result = await fetch('/api/blogs', {
            method: 'POST',
            body: data
        });
        // console.log('result', result)
        // console.log('data', data)
        if (result) {
            setShow(true)
            setFile(`https://heathers-projects.s3.amazonaws.com/fileUploadDemo-${fileInput.current.files[0].name}`)
            // console.log('file', file)
        }
    }

    const showImage = () => {
        if (show === true) {
            return (
                <div className="col-md-12">
                    <img src={`https://heathers-projects.s3.us-east-2.amazonaws.com/fileUploadDemo-${fileInput.current.files[0].name}`} alt="test" id="test" />
                </div>
            )
        }
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
                {showImage()}
                {/* <div className="col-md-12">
                    <img src={`https://heathers-projects.s3.us-east-2.amazonaws.com/fileUploadDemo-${fileInput.current.files[0].name}`} alt="test" id="test" />
                </div> */}
            </section>
        </main>
    );
}

export default App;
