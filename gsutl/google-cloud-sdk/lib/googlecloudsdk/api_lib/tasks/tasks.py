# -*- coding: utf-8 -*- #
# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""API Library for gcloud tasks."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from apitools.base.py import list_pager
from googlecloudsdk.api_lib import tasks
from googlecloudsdk.core import exceptions


class ModifyingPullAndAppEngineTaskError(exceptions.InternalError):
  """Error for when attempt to create a queue as both pull and App Engine."""


class Tasks(object):
  """API client for Cloud Tasks tasks."""

  def __init__(self, tasks_api=None):
    if tasks_api is None:
      tasks_api = tasks.ApiAdapter()
    self.api = tasks_api

  def List(self, parent_ref, limit=None, page_size=100):
    request = (
        self.api.messages.CloudtasksProjectsLocationsQueuesTasksListRequest(
            parent=parent_ref.RelativeName()))
    return list_pager.YieldFromList(
        self.api.tasks_service, request, batch_size=page_size, limit=limit,
        field='tasks', batch_size_attribute='pageSize')

  def Get(self, task_ref):
    request = (
        self.api.messages.CloudtasksProjectsLocationsQueuesTasksGetRequest(
            name=task_ref.RelativeName()))
    return self.api.tasks_service.Get(request)

  def Create(self, parent_ref, task_ref=None, schedule_time=None,
             pull_message=None, app_engine_http_request=None):
    """Prepares and sends a Create request for creating a task."""
    if pull_message and app_engine_http_request:
      raise ModifyingPullAndAppEngineTaskError(
          'Attempting to send PullMessage and AppEngineHttpRequest '
          'simultaneously')
    name = task_ref.RelativeName() if task_ref else None
    task = self.api.messages.Task(
        name=name, scheduleTime=schedule_time, pullMessage=pull_message,
        appEngineHttpRequest=app_engine_http_request)
    request = (
        self.api.messages.CloudtasksProjectsLocationsQueuesTasksCreateRequest(
            createTaskRequest=self.api.messages.CreateTaskRequest(task=task),
            parent=parent_ref.RelativeName()))
    return self.api.tasks_service.Create(request)

  def Delete(self, task_ref):
    request = (
        self.api.messages.CloudtasksProjectsLocationsQueuesTasksDeleteRequest(
            name=task_ref.RelativeName()))
    return self.api.tasks_service.Delete(request)

  def Run(self, task_ref):
    request = (
        self.api.messages.CloudtasksProjectsLocationsQueuesTasksRunRequest(
            name=task_ref.RelativeName()))
    return self.api.tasks_service.Run(request)

  def RenewLease(self, task_ref, schedule_time, lease_duration):
    """Constructs and sends a tasks RenewLease request to the Cloud Tasks API.

    Args:
      task_ref: A cloudtasks.projects.locations.queues.tasks resource reference
      schedule_time: string formatted as an ISO 8601 datetime with timezone
      lease_duration: string of an integer followed by 's', (e.g. '10s') for
                      the number of seconds for the new lease
    Returns:
      The response of the tasks RenewLease request
    """
    renew_lease_request = self.api.messages.RenewLeaseRequest(
        scheduleTime=schedule_time, leaseDuration=lease_duration)
    request_cls = (self.api.messages.
                   CloudtasksProjectsLocationsQueuesTasksRenewLeaseRequest)
    request = request_cls(renewLeaseRequest=renew_lease_request,
                          name=task_ref.RelativeName())
    return self.api.tasks_service.RenewLease(request)

  def CancelLease(self, task_ref, schedule_time):
    """Constructs and sends a tasks CancelLease request to the Cloud Tasks API.

    Args:
      task_ref: A cloudtasks.projects.locations.queues.tasks resource reference
      schedule_time: string formatted as an ISO 8601 datetime with timezone

    Returns:
      The response of the tasks CancelLease request
    """
    cancel_lease_request = self.api.messages.CancelLeaseRequest(
        scheduleTime=schedule_time)
    request_cls = (self.api.messages.
                   CloudtasksProjectsLocationsQueuesTasksCancelLeaseRequest)
    request = request_cls(cancelLeaseRequest=cancel_lease_request,
                          name=task_ref.RelativeName())
    return self.api.tasks_service.CancelLease(request)

  def Lease(self, queue_ref, lease_duration, filter_string=None,
            max_tasks=None):
    """Constructs and sends a LeaseTasks request to the Cloud Tasks API.

    Args:
      queue_ref: A cloudtasks.projects.locations.queues resource reference
      lease_duration: string of an integer followed by 's', (e.g. '10s') for the
                      number of seconds for the new leases
      filter_string: string with an expression to filter which tasks are leased
      max_tasks: the maximum number of tasks to lease

    Returns:
      The response of the LeaseTasks request
    """
    lease_tasks_request = self.api.messages.LeaseTasksRequest(
        filter=filter_string, leaseDuration=lease_duration, maxTasks=max_tasks)
    request = (
        self.api.messages.CloudtasksProjectsLocationsQueuesTasksLeaseRequest(
            leaseTasksRequest=lease_tasks_request,
            parent=queue_ref.RelativeName()))
    return self.api.tasks_service.Lease(request)

  def Acknowledge(self, task_ref, schedule_time):
    """Constructs and sends a tasks Acknowledge request to the Cloud Tasks API.

    Args:
      task_ref: A cloudtasks.projects.locations.queues.tasks resource reference
      schedule_time: string formatted as an ISO 8601 datetime with timezone

    Returns:
      The response of the tasks Acknowledge request
    """
    acknowledge_task_request = self.api.messages.AcknowledgeTaskRequest(
        scheduleTime=schedule_time)
    request_cls = (self.api.messages.
                   CloudtasksProjectsLocationsQueuesTasksAcknowledgeRequest)
    request = request_cls(acknowledgeTaskRequest=acknowledge_task_request,
                          name=task_ref.RelativeName())
    return self.api.tasks_service.Acknowledge(request)
