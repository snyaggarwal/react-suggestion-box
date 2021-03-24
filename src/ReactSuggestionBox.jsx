import React from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import { Feedback as SuggestionIcon } from '@material-ui/icons';
import { StylesProvider } from '@material-ui/core/styles';
import {
  TextField, DialogTitle, DialogContent, DialogActions, Dialog, Tooltip, Button,
} from '@material-ui/core';
import './reactSuggestionBox.scss'

class ReactSuggestionBox extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      feedbackDialgOpen: false,
      fields: {
        description: {
          value: undefined,
          errors: [],
        },
        image: {
          value: undefined,
          errors: [],
        }
      }
    };

    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.showSuggestionPanel = this.showSuggestionPanel.bind(this);
    this.handleSuggestionDialogClose = this.handleSuggestionDialogClose.bind(this);
    this.sendSuggestion = this.sendSuggestion.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  showSuggestionPanel(event) {
    window.scrollTo(0,0);
    var svgElements = document.body.querySelectorAll('svg');
    svgElements.forEach(function(item) {
      item.setAttribute("width", item.getBoundingClientRect().width);
      item.setAttribute("height", item.getBoundingClientRect().height);
      item.style.width = null;
      item.style.height= null;
    });
    html2canvas(document.querySelector("#root")).then(canvas => {
      let pngUrl = canvas.toDataURL();
      this.resetDialogAndOpen();
      let img = document.querySelector(".screen");
      img.src = pngUrl;

      const newState = this.state;
      newState.fields.image.value = pngUrl;
      this.setState(newState);
    });

    event.preventDefault();
  }

  resetDialogAndOpen() {
    this.setState({...JSON.parse(JSON.stringify(this.defaultState)), feedbackDialgOpen: true});
  }

  handleSuggestionDialogClose() {
    this.setState({feedbackDialgOpen: false});
  }

  sendSuggestion() {
    const { beforeSendValidator } = this.props;
    let isValid = true;
    if(beforeSendValidator)
      isValid = beforeSendValidator()
    if(!isValid)
      return

    if(this.state.fields.description.value) {
      this.setState({feedbackDialgOpen: false}, () => {
        if(this.props.onSubmit)
          this.props.onSubmit({
            description: this.state.fields.description.value,
            image: this.state.fields.image.value,
            url: window.location.href,
          })
      });
    } else {
      const newState = this.state;
      newState.fields.description.errors = ['Please enter some description'];
      this.setState(newState);
    }
  }

  handleDescriptionChange(event) {
    const newState = this.state;
    newState.fields.description.value = event.target.value;
    this.setState(newState);
  }

  render() {
    const {
      title, submitButtonLabel, cancelButtonLabel, containerClassName, mainButtonLabel,
      buttonTooltipText, descriptionPlaceholder, iconStyles, icon, startControls, endControls,
      isSendDisabled
    } = this.props;
    const hasButtonLabel = mainButtonLabel != false;
    const styles = hasButtonLabel ? Object.assign({}, {marginLeft: '-2px', marginRight: '17px'}, (iconStyles || {})) : (iconStyles || {})
    return (
      <StylesProvider injectFirst>
      <div className={containerClassName}>
        <Button
          fullWidth
          type="button"
          href="#"
          onClick={this.showSuggestionPanel}
        >
          <Tooltip title={buttonTooltipText || "Suggestion"} placement="right">
            {
              icon ? icon : <SuggestionIcon style={styles} />
            }
          </Tooltip>
          {
            hasButtonLabel &&
            <span className="nav-text">{mainButtonLabel || 'Suggestion'}</span>
          }
        </Button>
        <Dialog
          open={this.state.feedbackDialgOpen}
          onClose={this.handleSuggestionDialogClose}
          aria-labelledby="form-dialog-title"
          className='feedback-dialog'
          fullWidth
        >
          <DialogTitle id="form-dialog-title" className="feedback-section">
            {title || "Send Suggestion"}
          </DialogTitle>
          <DialogContent className="feedback-dialog-content">
            {startControls}
            <TextField
              style={{backgroundColor: '#fff'}}
              id="description"
              placeholder={descriptionPlaceholder || "Describe your issues or share your ideas"}
              value={this.state.fields.description.value}
              error={this.state.fields.description.errors[0]}
              helperText= {this.state.fields.description.errors[0]}
              multiline={true}
              rows={15}
              onChange={this.handleDescriptionChange}
              fullWidth
            />
            {endControls}
            <img width="100%" className="screen" style={{marginTop: '25px'}} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSuggestionDialogClose} variant="contained">
              {cancelButtonLabel || "Cancel"}
            </Button>
            <Button onClick={this.sendSuggestion} color='primary' variant="contained" disabled={isSendDisabled}>
              {submitButtonLabel || 'Send'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </StylesProvider>
    );
  }
}

ReactSuggestionBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReactSuggestionBox;
