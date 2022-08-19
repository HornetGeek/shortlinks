import { SlugIcon } from '../slug-icon';
import './style.css'


export const Form = ({ handleChange, formData , currentAction}) => {

    return (
        <>
            <div data-v-154c538c="" className="form-group mb-3">
                <label data-v-154c538c="" htmlFor="long-url" className="label-fancy mb-2">
                    Enter a URL For a Android :</label>

                <div className='input'>
                    <input onChange={event => handleChange({ ...formData, android: { ...formData.android, primary: event.target.value } })} data-v-154c538c="" placeholder='primary' id="long-url" type="text" aria-label="Long URL" required={currentAction === 'add' ? "required" : undefined} className="enterurl form-control form-control-lg form-control-fancy text-t-green" />
                    <input onChange={event => handleChange({ ...formData, android: { ...formData.android, fallback: event.target.value } })} data-v-154c538c="" placeholder='fallback' id="long-url" type="text" aria-label="Long URL" required={currentAction === 'add' ? "required" : undefined} className="enterurl form-control form-control-lg form-control-fancy text-t-green" />
                </div>

            </div><div data-v-154c538c="" className="form-group mb-3">
                <label data-v-154c538c="" htmlFor="long-url" className="label-fancy mb-2">
                    Enter a URL For a ios :</label>

                <div className='input'>
                    <input onChange={event => handleChange({ ...formData, ios: { ...formData.ios, primary: event.target.value } })} data-v-154c538c="" placeholder='primary' id="long-url" type="text" aria-label="Long URL" required={currentAction === 'add' ? "required" : undefined} className="enterurl form-control form-control-lg form-control-fancy text-t-green" />
                    <input onChange={event => handleChange({ ...formData, ios: { ...formData.ios, fallback: event.target.value } })} data-v-154c538c="" placeholder='fallback' id="long-url" type="text" aria-label="Long URL" required={currentAction === 'add' ? "required" : undefined} className="enterurl form-control form-control-lg form-control-fancy text-t-green" />
                </div>

            </div><div data-v-154c538c="" className="form-group mb-3">
                <label data-v-154c538c="" htmlFor="long-url" className="label-fancy mb-2">
                    Enter a URL For a web :</label>

                <div className='input'>
                    <input onChange={event => handleChange({ ...formData, web: event.target.value })} data-v-154c538c="" placeholder='primary' id="long-url" type="text" aria-label="Long URL" required={currentAction === 'add' ? "required" : undefined}  className="enterurl form-control form-control-lg form-control-fancy text-t-green" />
                </div>

            </div>
            <label data-v-154c538c="" htmlFor="domain" className="homeFormTiny__cust-title mb-0">

                <SlugIcon />

                <span data-v-154c538c="">Customize your link</span>
            </label><div data-v-154c538c="" className="form-row">
                <div data-v-154c538c="" className="col-12 col-md-7 pr-md-0 pt-1">

                </div>
                <div data-v-154c538c="" className="col-12 col-md-5 pl-md-0 pt-1">

                    <input onChange={event => handleChange({ ...formData, slug: event.target.value })} required={currentAction === 'edit' ? "required" : undefined}  data-v-154c538c="" aria-label="Alias" type="text" placeholder="slug" className="alias-input form-control text-t-green" />

                </div>
            </div>
        </>

    )
};