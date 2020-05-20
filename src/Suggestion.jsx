import React from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import { Suggestion as SuggestionIcon } from '@material-ui/icons';
import {
  TextField, DialogTitle, DialogContent, DialogActions, Dialog, Tooltip, Button,
} from '@material-ui/core';

class Suggestion extends React.Component {
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

    this.state = {...this.defaultState};
    this.showSuggestionPanel = this.showSuggestionPanel.bind(this);
    this.handleSuggestionDialogClose = this.handleSuggestionDialogClose.bind(this);
    this.sendSuggestion = this.sendSuggestion.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  showSuggestionPanel(event) {
    window.scrollTo(0,0);
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
    this.setState({...this.defaultState, feedbackDialgOpen: true});
  }

  handleSuggestionDialogClose() {
    this.setState({feedbackDialgOpen: false});
  }

  sendSuggestion() {
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
      title, submitButtonLabel, cancelButtonLabel
    } = this.props;
    return (
      <div className="left-bar-control">
        <Button
          fullWidth
          type="button"
          href="#"
          onClick={this.showSuggestionPanel}
        >
          <Tooltip title="Suggestion" placement="right">
            <SuggestionIcon style={{marginLeft: '-2px', marginRight: '17px'}}/>
          </Tooltip>
          <span className="nav-text">Suggestion</span>
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
            <TextField
              style={{backgroundColor: '#fff'}}
              className="text-area"
              id="description"
              placeholder="Describe your issues or share your ideas"
              value={this.state.fields.description.value}
              error={this.state.fields.description.errors[0]}
              helperText= {this.state.fields.description.errors[0]}
              multiline={true}
              rows={15}
              onChange={this.handleDescriptionChange}
              fullWidth
            />
            <img width="100%" className="screen" style={{marginTop: '25px'}} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSuggestionDialogClose} variant="raised">
              {cancelButtonLabel || "Cancel"}
            </Button>
            <Button onClick={this.sendSuggestion} color='primary' variant="raised">
              {submitButtonLabel || 'Send'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Suggestion.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Suggestion;
